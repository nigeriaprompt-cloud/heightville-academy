import { db } from "@/lib/db";
import { decrypt } from "@/lib/crypto";
import { requireStaff } from "@/lib/auth";
import { addStudent, changeStudentPassword, removeStudent } from "@/app/actions";
import { classLevels } from "@/data/classes";
import ActionForm from "@/components/ActionForm";
export const dynamic = "force-dynamic";
const ERR = { short: "Passwords must be at least 6 characters.", taken: "That password is already used by another student." };

export default async function Students({ searchParams }) {
  await requireStaff();
  const q = (searchParams.q || "").trim(), cls = searchParams.class || "";
  let query = db().from("students").select("*").order("class_level").order("name");
  if (q) query = query.ilike("name", `%${q}%`);
  if (cls) query = query.eq("class_level", cls);
  const { data: list } = await query;
  return (
    <section className="section"><div className="wrap">
      <h1 className="serif dash-title">Students</h1>
      {ERR[searchParams.err] && <p className="form-error" role="alert">{ERR[searchParams.err]}</p>}
      <div className="panel-grid">
        <div className="panel"><h2 className="serif">Add a student</h2>
          <ActionForm action={addStudent} submit="Add student" hint="Students sign in with the password only, so each password must be different. Leave it empty to create one automatically."
            fields={[{ name: "name", label: "Full name", required: true }, { name: "class_level", label: "Class", options: classLevels }, { name: "password", label: "Password (optional)", placeholder: "Leave empty to generate" }]} /></div>
        <div className="panel"><h2 className="serif">Find students</h2>
          <form method="get" className="portal-form">
            <label className="field">Name<input name="q" defaultValue={q} placeholder="Search by name" /></label>
            <label className="field">Class<select name="class" defaultValue={cls}><option value="">All classes</option>{classLevels.map((c) => <option key={c}>{c}</option>)}</select></label>
            <button className="btn btn-navy">Search</button>
          </form></div>
      </div>
      <div className="panel"><h2 className="serif">{list?.length || 0} student{list?.length === 1 ? "" : "s"}</h2>
        {!list?.length ? <p className="hint">No students found.</p> : (
          <div className="table-wrap"><table className="table">
            <thead><tr><th>Name</th><th>Class</th><th>Password</th><th>Change password</th><th></th></tr></thead>
            <tbody>{list.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td><td>{s.class_level}</td><td><code className="pw">{decrypt(s.pw_enc)}</code></td>
                <td><form action={changeStudentPassword} className="row-form"><input type="hidden" name="id" value={s.id} /><input name="password" placeholder="New password" aria-label={`New password for ${s.name}`} required /><button className="btn btn-outline-dark sm">Save</button></form></td>
                <td><details className="remove"><summary>Remove</summary><form action={removeStudent}><input type="hidden" name="id" value={s.id} /><button className="btn btn-danger sm">Yes, remove {s.name.split(" ")[0]}</button></form></details></td>
              </tr>))}</tbody></table></div>)}
      </div>
    </div></section>
  );
}
