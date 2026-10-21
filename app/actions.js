"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { configured, db } from "@/lib/db";
import { encrypt, lookup, randomPassword, safeEqual, sign, verify } from "@/lib/crypto";
import { clientIp, endSession, isRankingOn, recordFail, requireProprietor, requireStaff, requireStudent, startSession, tooMany } from "@/lib/auth";
import { gradeOf, pct } from "@/lib/grade";
import { questions as bank } from "@/data/questions";

const val = (f, k) => String(f.get(k) ?? "").trim();
const NOT_READY = { error: "The portal is not set up yet. Please contact the school office." };
const TOO_MANY = { error: "Too many wrong attempts. Please wait 10 minutes and try again." };
const dupMsg = (e, what) => (e.code === "23505" ? `That ${what} is already in use. Choose a different one.` : "Could not save. Please try again.");

/* ---------- sign in / out ---------- */
export async function studentLogin(_prev, f) {
  if (!configured()) return NOT_READY;
  const ip = clientIp();
  if (await tooMany(ip)) return TOO_MANY;
  const pw = val(f, "password");
  const { data } = pw ? await db().from("students").select("id").eq("pw_lookup", lookup(pw, true)).maybeSingle() : { data: null };
  if (!data) { await recordFail(ip); return { error: "Wrong password. Please check and try again." }; }
  startSession("student", data.id);
  redirect("/student");
}

export async function staffLogin(_prev, f) {
  if (!configured()) return NOT_READY;
  const ip = clientIp();
  if (await tooMany(ip)) return TOO_MANY;
  const { data } = await db().from("staff").select("id,pw_lookup").eq("username", val(f, "username").toLowerCase()).maybeSingle();
  if (!data || !safeEqual(data.pw_lookup, lookup(val(f, "password")))) { await recordFail(ip); return { error: "Wrong username or password." }; }
  startSession("staff", data.id);
  redirect("/staff");
}

export async function logout() { endSession(); redirect("/"); }

// One-time creation of the proprietor account, protected by SETUP_CODE.
export async function setupProprietor(_prev, f) {
  if (!configured() || !process.env.SETUP_CODE) return NOT_READY;
  if (!safeEqual(val(f, "code"), process.env.SETUP_CODE)) { await recordFail(clientIp()); return { error: "Wrong setup code." }; }
  const { count } = await db().from("staff").select("id", { count: "exact", head: true }).eq("role", "proprietor");
  if (count) return { error: "Setup is already complete. Please sign in." };
  const name = val(f, "name"), username = val(f, "username").toLowerCase(), pw = val(f, "password");
  if (!name || !username || pw.length < 6) return { error: "Enter a name, a username and a password of at least 6 characters." };
  const { data, error } = await db().from("staff").insert({ name, username, role: "proprietor", pw_lookup: lookup(pw), pw_enc: encrypt(pw) }).select("id").single();
  if (error) return { error: dupMsg(error, "username") };
  startSession("staff", data.id);
  redirect("/staff");
}

/* ---------- students (any staff member) ---------- */
export async function addStudent(_prev, f) {
  const me = await requireStaff();
  const name = val(f, "name"), cls = val(f, "class_level"), pw = val(f, "password") || randomPassword(8);
  if (!name || !cls) return { error: "Enter the student's name and class." };
  if (pw.length < 6) return { error: "The password must be at least 6 characters." };
  const { error } = await db().from("students").insert({ name, class_level: cls, pw_lookup: lookup(pw, true), pw_enc: encrypt(pw), created_by: me.id });
  if (error) return { error: dupMsg(error, "password") };
  revalidatePath("/staff/students");
  return { ok: `${name} added. Password: ${pw}` };
}
export async function changeStudentPassword(f) {
  await requireStaff();
  const pw = val(f, "password");
  if (pw.length < 6) redirect("/staff/students?err=short");
  const { error } = await db().from("students").update({ pw_lookup: lookup(pw, true), pw_enc: encrypt(pw) }).eq("id", val(f, "id"));
  if (error) redirect("/staff/students?err=taken");
  revalidatePath("/staff/students");
}
export async function removeStudent(f) {
  await requireStaff();
  await db().from("students").delete().eq("id", val(f, "id"));
  revalidatePath("/staff/students");
}
export async function toggleRanking() {
  await requireStaff();
  const on = await isRankingOn();
  await db().from("settings").upsert({ key: "ranking_enabled", value: !on });
  revalidatePath("/staff");
}

/* ---------- team (proprietor only) ---------- */
export async function addStaff(_prev, f) {
  await requireProprietor();
  const name = val(f, "name"), username = val(f, "username").toLowerCase(), pw = val(f, "password") || randomPassword(8);
  if (!name || !username) return { error: "Enter a name and a username." };
  if (pw.length < 6) return { error: "The password must be at least 6 characters." };
  const { error } = await db().from("staff").insert({ name, username, role: "teacher", pw_lookup: lookup(pw), pw_enc: encrypt(pw) });
  if (error) return { error: dupMsg(error, "username") };
  revalidatePath("/staff/team");
  return { ok: `${name} added. Username: ${username} · Password: ${pw}` };
}
export async function changeStaffPassword(f) {
  await requireProprietor();
  const pw = val(f, "password");
  if (pw.length < 6) redirect("/staff/team?err=short");
  await db().from("staff").update({ pw_lookup: lookup(pw), pw_enc: encrypt(pw) }).eq("id", val(f, "id"));
  revalidatePath("/staff/team");
}
export async function removeStaff(f) {
  const me = await requireProprietor();
  if (val(f, "id") === me.id) redirect("/staff/team?err=self");
  await db().from("staff").delete().eq("id", val(f, "id"));
  revalidatePath("/staff/team");
}

/* ---------- exams (teachers; the proprietor can edit any) ---------- */
async function ownExam(me, id) {
  const { data } = await db().from("exams").select("*").eq("id", id).maybeSingle();
  if (!data || (me.role !== "proprietor" && data.created_by !== me.id)) redirect("/staff/exams");
  return data;
}
export async function createExam(f) {
  const me = await requireStaff();
  const title = val(f, "title"), subject = val(f, "subject"), cls = val(f, "class_level");
  if (!title || !subject) redirect("/staff/exams?err=missing");
  const timed = val(f, "timed") === "yes";
  const minutes = Math.min(300, Math.max(1, parseInt(val(f, "duration"), 10) || 30));
  const { data } = await db().from("exams").insert({ title, subject, class_level: cls, timed, duration_minutes: timed ? minutes : null, created_by: me.id }).select("id").single();
  redirect(`/staff/exams/${data.id}`);
}
export async function addQuestion(f) {
  const me = await requireStaff(), id = val(f, "exam_id");
  await ownExam(me, id);
  const raw = ["a", "b", "c", "d"].map((k) => val(f, k)), letter = "ABCD".indexOf(val(f, "correct")), question = val(f, "question");
  if (!question || letter < 0 || !raw[letter] || raw.filter(Boolean).length < 2) redirect(`/staff/exams/${id}?err=question`);
  const options = raw.filter(Boolean);
  await db().from("exam_questions").insert({ exam_id: id, question, options, answer_index: options.indexOf(raw[letter]), explanation: val(f, "explanation") || null });
  revalidatePath(`/staff/exams/${id}`);
}
// One question per line:  question | A | B | C | D | correct letter | explanation (optional)
export async function importQuestions(f) {
  const me = await requireStaff(), id = val(f, "exam_id");
  await ownExam(me, id);
  const rows = [];
  let skipped = 0;
  for (const line of val(f, "lines").split("\n").map((l) => l.trim()).filter(Boolean)) {
    const [question, a, b, c, d, correct, explanation] = line.split("|").map((s) => s.trim());
    const raw = [a, b, c, d], letter = "ABCD".indexOf((correct || "").toUpperCase());
    if (!question || letter < 0 || !raw[letter] || raw.filter(Boolean).length < 2) { skipped++; continue; }
    const options = raw.filter(Boolean);
    rows.push({ exam_id: id, position: rows.length, question, options, answer_index: options.indexOf(raw[letter]), explanation: explanation || null });
  }
  if (rows.length) await db().from("exam_questions").insert(rows);
  redirect(`/staff/exams/${id}?imported=${rows.length}&skipped=${skipped}`);
}
export async function deleteQuestion(f) {
  const me = await requireStaff(), id = val(f, "exam_id");
  await ownExam(me, id);
  await db().from("exam_questions").delete().eq("id", val(f, "id")).eq("exam_id", id);
  revalidatePath(`/staff/exams/${id}`);
}
export async function togglePublish(f) {
  const me = await requireStaff(), exam = await ownExam(me, val(f, "exam_id"));
  if (!exam.published) {
    const { count } = await db().from("exam_questions").select("id", { count: "exact", head: true }).eq("exam_id", exam.id);
    if (!count) redirect(`/staff/exams/${exam.id}?err=empty`);
  }
  await db().from("exams").update({ published: !exam.published }).eq("id", exam.id);
  revalidatePath(`/staff/exams/${exam.id}`);
}
export async function deleteExam(f) {
  const me = await requireStaff();
  await ownExam(me, val(f, "exam_id"));
  await db().from("exams").delete().eq("id", val(f, "exam_id"));
  redirect("/staff/exams");
}

/* ---------- students taking exams (marking happens here, on the server) ---------- */
const review = (qs, answers) => qs.map((q) => ({ question: q.question, yours: answers[q.id] ?? null, correct: q.answerText, explanation: q.explanation || "", ok: answers[q.id] === q.answerText }));
const result = (qs, answers, extra = {}) => {
  const rv = review(qs, answers), score = rv.filter((r) => r.ok).length, percent = pct(score, qs.length);
  return { score, total: qs.length, percent, grade: gradeOf(percent), review: rv, ...extra };
};

export async function startExam(f) {
  const me = await requireStudent(), examId = val(f, "exam_id");
  const { data: exam } = await db().from("exams").select("*").eq("id", examId).eq("published", true).maybeSingle();
  if (!exam || ![me.class_level, "All classes"].includes(exam.class_level)) redirect("/student");
  await db().from("attempts").insert({ student_id: me.id, exam_id: exam.id, label: exam.title, subject: exam.subject, duration_seconds: exam.timed ? exam.duration_minutes * 60 : null });
  redirect(`/student/exam/${exam.id}`);
}

export async function submitExam(attemptId, answers) {
  const me = await requireStudent();
  const { data: att } = await db().from("attempts").select("*").eq("id", attemptId).eq("student_id", me.id).maybeSingle();
  if (!att) return { error: "This attempt was not found." };
  if (att.submitted_at) return { error: "This exam has already been submitted." };
  const { data: rows } = await db().from("exam_questions").select("*").eq("exam_id", att.exam_id).order("created_at").order("position");
  const qs = rows.map((q) => ({ ...q, answerText: q.options[q.answer_index] }));
  const elapsed = (Date.now() - new Date(att.started_at).getTime()) / 1000;
  const late = att.duration_seconds && elapsed > att.duration_seconds + 120; // 2 minutes' grace for slow networks
  const r = result(qs, late ? {} : answers || {}, late ? { late: true } : {});
  await db().from("attempts").update({ submitted_at: new Date().toISOString(), score: r.score, total: r.total, percent: r.percent }).eq("id", att.id);
  revalidatePath("/student");
  return r;
}

export async function submitPractice(token, answers) {
  const me = await requireStudent(), p = verify(token);
  if (!p) return { error: "This practice session has expired. Please start a new one." };
  const qs = p.ids.map((id) => bank.find((q) => q.id === id)).filter(Boolean).map((q) => ({ ...q, answerText: q.answer }));
  const r = result(qs, answers || {});
  await db().from("attempts").insert({ student_id: me.id, label: p.label, subject: p.subject, submitted_at: new Date().toISOString(), score: r.score, total: r.total, percent: r.percent });
  revalidatePath("/student");
  return r;
}

/* ---------- news and events (proprietor only) ---------- */
export async function createNews(f) {
  const me = await requireProprietor();
  const kind = val(f, "kind") === "Event" ? "Event" : "News", title = val(f, "title"), body = val(f, "body"), date = val(f, "event_date");
  if (!title || !body) redirect("/staff/news?err=missing");
  await db().from("news").insert({ kind, title, body, event_date: kind === "Event" && date ? date : null, created_by: me.id });
  revalidatePath("/"); revalidatePath("/news"); revalidatePath("/staff/news");
  redirect("/staff/news?ok=1");
}
export async function deleteNews(f) {
  await requireProprietor();
  await db().from("news").delete().eq("id", val(f, "id"));
  revalidatePath("/"); revalidatePath("/news"); revalidatePath("/staff/news");
}
