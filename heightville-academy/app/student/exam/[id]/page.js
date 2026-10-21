import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireStudent } from "@/lib/auth";
import { startExam, submitExam } from "@/app/actions";
import { gradeOf } from "@/lib/grade";
import ExamRunner from "@/components/ExamRunner";
export const dynamic = "force-dynamic";

export default async function ExamPage({ params }) {
  const me = await requireStudent();
  const { data: exam } = await db().from("exams").select("*").eq("id", params.id).eq("published", true).maybeSingle();
  if (!exam || ![me.class_level, "All classes"].includes(exam.class_level)) redirect("/student");
  const { data: att } = await db().from("attempts").select("*").eq("student_id", me.id).eq("exam_id", exam.id).maybeSingle();

  if (att?.submitted_at) return (
    <section className="section"><div className="wrap narrow panel">
      <h1 className="serif">{exam.title}</h1>
      <p>You have already taken this exam: <strong>{att.score} / {att.total}</strong> ({Number(att.percent)}%), grade {gradeOf(Number(att.percent))}.</p>
      <Link href="/student" className="btn btn-navy">Back to my dashboard</Link>
    </div></section>
  );

  const { data: rows } = await db().from("exam_questions").select("id,question,options").eq("exam_id", exam.id).order("created_at").order("position");
  if (!att) return (
    <section className="section"><div className="wrap narrow panel">
      <h1 className="serif">{exam.title}</h1>
      <ul className="plist"><li>Subject: {exam.subject}</li><li>{rows.length} question{rows.length === 1 ? "" : "s"}</li>
        <li>{exam.timed ? `Time allowed: ${exam.duration_minutes} minutes. The exam submits itself when time is up.` : "There is no time limit."}</li>
        <li>You can take this exam once.</li></ul>
      <form action={startExam}><input type="hidden" name="exam_id" value={exam.id} /><button className="btn btn-gold">Start exam</button></form>
    </div></section>
  );

  const left = exam.timed ? Math.max(0, att.duration_seconds - Math.floor((Date.now() - new Date(att.started_at).getTime()) / 1000)) : null;
  return <section className="section"><div className="wrap narrow"><ExamRunner title={exam.title} questions={rows} seconds={left} submit={submitExam.bind(null, att.id)} /></div></section>;
}
