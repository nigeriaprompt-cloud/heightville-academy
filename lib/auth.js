import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "./db";
import { sign, verify } from "./crypto";

const NAME = "hva_session";
const HOURS = 12;

export function startSession(kind, id) {
  cookies().set(NAME, sign({ kind, id, exp: Date.now() + HOURS * 3600e3 }), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: HOURS * 3600,
  });
}
export const endSession = () => cookies().delete(NAME);

// Re-reads the account on every request, so a removed user loses access at once.
export async function getSession() {
  const p = verify(cookies().get(NAME)?.value);
  if (!p) return null;
  const { data } = await db().from(p.kind === "student" ? "students" : "staff").select("*").eq("id", p.id).maybeSingle();
  return data ? { kind: p.kind, user: data } : null;
}
export async function requireStudent() {
  const s = await getSession();
  if (!s || s.kind !== "student") redirect("/student-portal");
  return s.user;
}
export async function requireStaff() {
  const s = await getSession();
  if (!s || s.kind !== "staff") redirect("/staff-portal");
  return s.user;
}
export async function requireProprietor() {
  const u = await requireStaff();
  if (u.role !== "proprietor") redirect("/staff");
  return u;
}

export const clientIp = () => (headers().get("x-forwarded-for") || "unknown").split(",")[0].trim();
// Blocks guessing: 30 wrong logins from one address in 10 minutes (a school shares one address).
export async function tooMany(ip) {
  const since = new Date(Date.now() - 10 * 60e3).toISOString();
  const { count } = await db().from("login_attempts").select("ip", { count: "exact", head: true }).eq("ip", ip).gte("at", since);
  return (count || 0) >= 30;
}
export const recordFail = (ip) => db().from("login_attempts").insert({ ip });

export async function isRankingOn() {
  const { data } = await db().from("settings").select("value").eq("key", "ranking_enabled").maybeSingle();
  return data?.value === true;
}

// Average score per student in one class, best first (ties share a rank).
export async function ranking(classLevel) {
  const { data: studs } = await db().from("students").select("id,name").eq("class_level", classLevel);
  if (!studs?.length) return [];
  const { data: att } = await db().from("attempts").select("student_id,percent").not("submitted_at", "is", null).in("student_id", studs.map((s) => s.id));
  const sums = {};
  for (const a of att || []) { const s = (sums[a.student_id] ||= { t: 0, n: 0 }); s.t += Number(a.percent); s.n += 1; }
  const rows = studs.filter((s) => sums[s.id]).map((s) => ({ id: s.id, name: s.name, avg: Math.round((sums[s.id].t / sums[s.id].n) * 10) / 10, count: sums[s.id].n }))
    .sort((a, b) => b.avg - a.avg || b.count - a.count);
  let rank = 0;
  return rows.map((r, i) => ({ ...r, rank: i > 0 && r.avg === rows[i - 1].avg ? rank : (rank = i + 1) }));
}
