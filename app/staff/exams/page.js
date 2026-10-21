import Link from "next/link";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";
import { createExam } from "@/app/actions";
import { examTargets } from "@/data/classes";
import { departments } from "@/data/subjects";
export const dynamic = "force-dynamic";

export default async function Exams({ searchParams }) {
  const me = await requireStaff();
  let query = db().from("exams").select("*").order("created_at", { ascending: false });
  if (me.role !== "proprietor") query = query.eq("created_by", me.id);
  const { data: list } = await query;
  const subjects = Object.values(departments).flat();
  return (
    <section className="section"><div className="wrap">
      <h1 className="serif dash-title">Exams</h1>
      {searchParams.err && <p className="form-error" role="alert">Enter a title and a subject.</p>}
      <div className="panel"><h2 className="serif">Create an exam</h2>
        <form action={createExam} className="portal-form">
          <label className="field">Title<input name="title" required placeholder="e.g. First Term Mathematics Test" /></label>
          <label className="field">Subject<input name="subject" list="subjects" required /><datalist id="subjects">{subjects.map((s) => <option key={s} value={s} />)}</datalist></label>
          <label className="field">For class<select name="class_level">{examTargets.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="field">Timing<select name="timed"><option value="yes">Timed (CBT, submits itself when time is up)</option><option value="no">No timer</option></select></label>
          <label className="field">Time allowed (minutes, for timed exams)<input name="duration" type="number" min="1" max="300" defaultValue="30" /></label>
          <button className="btn btn-navy">Create and add questions</button>
        </form></div>
      <div className="panel"><h2 className="serif">{me.role === "proprietor" ? "All exams" : "My exams"}</h2>
        {!list?.length ? <p className="hint">No exams yet.</p> : (
          <div className="table-wrap"><table className="table"><thead><tr><th>Title</th><th>Subject</th><th>Class</th><th>Timing</th><th>Status</th><th></th></tr></thead>
            <tbody>{list.map((e) => <tr key={e.id}><td>{e.title}</td><td>{e.subject}</td><td>{e.class_level}</td><td>{e.timed ? `${e.duration_minutes} min` : "No timer"}</td>
              <td><span className={`badge ${e.published ? "ok" : ""}`}>{e.published ? "Published" : "Draft"}</span></td><td><Link href={`/staff/exams/${e.id}`} className="link">Manage</Link></td></tr>)}</tbody></table></div>)}
      </div>
    </div></section>
  );
}
