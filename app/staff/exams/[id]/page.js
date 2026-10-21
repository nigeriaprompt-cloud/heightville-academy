import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";
import { addQuestion, deleteExam, deleteQuestion, importQuestions, togglePublish } from "@/app/actions";
import { gradeOf } from "@/lib/grade";
export const dynamic = "force-dynamic";

export default async function ExamDetail({ params, searchParams }) {
  const me = await requireStaff();
  const { data: exam } = await db().from("exams").select("*").eq("id", params.id).maybeSingle();
  if (!exam || (me.role !== "proprietor" && exam.created_by !== me.id)) redirect("/staff/exams");
  const [{ data: qs }, { data: results }] = await Promise.all([
    db().from("exam_questions").select("*").eq("exam_id", exam.id).order("created_at").order("position"),
    db().from("attempts").select("score,total,percent,submitted_at,students(name,class_level)").eq("exam_id", exam.id).not("submitted_at", "is", null).order("percent", { ascending: false }),
  ]);
  const msg = searchParams.err === "question" ? "Enter the question, at least two options, and pick a correct option that is filled in."
    : searchParams.err === "empty" ? "Add at least one question before publishing."
    : searchParams.imported ? `Imported ${searchParams.imported} question(s); skipped ${searchParams.skipped || 0} line(s) that were not in the right format.` : "";
  const hidden = <input type="hidden" name="exam_id" value={exam.id} />;
  return (
    <section className="section"><div className="wrap">
      <p><Link href="/staff/exams" className="link">← All exams</Link></p>
      <h1 className="serif dash-title">{exam.title}</h1>
      <p>{exam.subject} · {exam.class_level} · {exam.timed ? `Timed, ${exam.duration_minutes} minutes, submits automatically` : "No timer"} · <span className={`badge ${exam.published ? "ok" : ""}`}>{exam.published ? "Published" : "Draft"}</span></p>
      <div className="actions">
        <form action={togglePublish}>{hidden}<button className="btn btn-gold">{exam.published ? "Unpublish" : "Publish to students"}</button></form>
        <details className="remove"><summary>Delete exam</summary><form action={deleteExam}>{hidden}<button className="btn btn-danger sm">Yes, delete this exam and its results</button></form></details>
      </div>
      {msg && <p className={searchParams.err ? "form-error" : "form-ok"} role="status">{msg}</p>}

      <div className="panel-grid">
        <div className="panel"><h2 className="serif">Add a question</h2>
          <form action={addQuestion} className="portal-form">{hidden}
            <label className="field">Question<textarea name="question" rows="3" required /></label>
            {["a", "b", "c", "d"].map((k) => <label key={k} className="field">Option {k.toUpperCase()}<input name={k} required={k === "a" || k === "b"} /></label>)}
            <label className="field">Correct option<select name="correct"><option>A</option><option>B</option><option>C</option><option>D</option></select></label>
            <label className="field">Explanation (optional)<input name="explanation" /></label>
            <button className="btn btn-navy">Add question</button>
          </form></div>
        <div className="panel"><h2 className="serif">Add many at once</h2>
          <form action={importQuestions} className="portal-form">{hidden}
            <p className="hint">One question per line, separated by the | sign:<br /><code>question | A | B | C | D | correct letter | explanation</code></p>
            <label className="field">Questions<textarea name="lines" rows="9" required placeholder="What is 2 + 3? | 4 | 5 | 6 | 7 | B | 2 + 3 = 5" /></label>
            <button className="btn btn-navy">Import</button>
          </form></div>
      </div>

      <div className="panel"><h2 className="serif">{qs?.length || 0} question{qs?.length === 1 ? "" : "s"}</h2>
        {!qs?.length ? <p className="hint">No questions yet.</p> : (
          <ol className="qlist">{qs.map((q) => (
            <li key={q.id}><strong>{q.question}</strong>
              <ul>{q.options.map((o, i) => <li key={i} className={i === q.answer_index ? "right" : ""}>{"ABCD"[i]}. {o}</li>)}</ul>
              {q.explanation && <em>{q.explanation}</em>}
              <form action={deleteQuestion}>{hidden}<input type="hidden" name="id" value={q.id} /><button className="btn btn-outline-dark sm">Delete</button></form></li>))}</ol>)}
      </div>

      <div className="panel"><h2 className="serif">Results</h2>
        {!results?.length ? <p className="hint">No one has finished this exam yet.</p> : (
          <div className="table-wrap"><table className="table"><thead><tr><th>Student</th><th>Class</th><th>Score</th><th>%</th><th>Grade</th></tr></thead>
            <tbody>{results.map((r, i) => <tr key={i}><td>{r.students?.name}</td><td>{r.students?.class_level}</td><td>{r.score}/{r.total}</td><td>{Number(r.percent)}%</td><td>{gradeOf(Number(r.percent))}</td></tr>)}</tbody></table></div>)}
      </div>
    </div></section>
  );
}
