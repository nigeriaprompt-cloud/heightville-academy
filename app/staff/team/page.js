import { db } from "@/lib/db";
import { decrypt } from "@/lib/crypto";
import { requireProprietor } from "@/lib/auth";
import { addStaff, changeStaffPassword, removeStaff } from "@/app/actions";
import ActionForm from "@/components/ActionForm";
export const dynamic = "force-dynamic";
const ERR = { short: "Passwords must be at least 6 characters.", self: "You cannot remove your own account." };

export default async function Team({ searchParams }) {
  const me = await requireProprietor();
  const { data: list } = await db().from("staff").select("*").order("role", { ascending: false }).order("name");
  return (
    <section className="section"><div className="wrap">
      <h1 className="serif dash-title">Team</h1>
      {ERR[searchParams.err] && <p className="form-error" role="alert">{ERR[searchParams.err]}</p>}
      <div className="panel"><h2 className="serif">Add a teacher</h2>
        <ActionForm action={addStaff} submit="Add teacher" hint="Leave the password empty to create one automatically. You can always see it below."
          fields={[{ name: "name", label: "Full name", required: true }, { name: "username", label: "Username (used to sign in)", required: true }, { name: "password", label: "Password (optional)", placeholder: "Leave empty to generate" }]} /></div>
      <div className="panel"><h2 className="serif">{list?.length || 0} on the team</h2>
        <div className="table-wrap"><table className="table">
          <thead><tr><th>Name</th><th>Username</th><th>Role</th><th>Password</th><th>Change password</th><th></th></tr></thead>
          <tbody>{list?.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td><td>{s.username}</td><td>{s.role === "proprietor" ? "Proprietor" : "Teacher"}</td><td><code className="pw">{decrypt(s.pw_enc)}</code></td>
              <td><form action={changeStaffPassword} className="row-form"><input type="hidden" name="id" value={s.id} /><input name="password" placeholder="New password" aria-label={`New password for ${s.name}`} required /><button className="btn btn-outline-dark sm">Save</button></form></td>
              <td>{s.id !== me.id && <details className="remove"><summary>Remove</summary><form action={removeStaff}><input type="hidden" name="id" value={s.id} /><button className="btn btn-danger sm">Yes, remove {s.name.split(" ")[0]}</button></form></details>}</td>
            </tr>))}</tbody></table></div>
      </div>
    </div></section>
  );
}
