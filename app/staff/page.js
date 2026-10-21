import Link from "next/link";
import { db } from "@/lib/db";
import { isRankingOn, requireStaff } from "@/lib/auth";
import { toggleRanking } from "@/app/actions";
export const dynamic = "force-dynamic";

const count = async (table) => (await db().from(table).select("id", { count: "exact", head: true })).count || 0;

export default async function StaffHome() {
  const me = await requireStaff();
  const [students, exams, staff, on] = await Promise.all([count("students"), count("exams"), count("staff"), isRankingOn()]);
  return (
    <section className="section"><div className="wrap">
      <h1 className="serif dash-title">Dashboard</h1>
      <div className="stats">
        <div className="stat"><strong className="serif">{students}</strong><span>Students</span></div>
        <div className="stat"><strong className="serif">{exams}</strong><span>Exams</span></div>
        {me.role === "proprietor" && <div className="stat"><strong className="serif">{staff}</strong><span>Staff</span></div>}
      </div>
      <div className="panel-grid">
        <div className="panel"><h2 className="serif">Students</h2><p>Add students, see and change their passwords, search by name or class.</p><Link href="/staff/students" className="btn btn-navy">Manage students</Link></div>
        <div className="panel"><h2 className="serif">Exams</h2><p>Set questions, choose timed (CBT, auto-submit) or no timer, and publish to a class.</p><Link href="/staff/exams" className="btn btn-navy">Manage exams</Link></div>
        {me.role === "proprietor" && <div className="panel"><h2 className="serif">Team</h2><p>Add or remove teachers and see their passwords.</p><Link href="/staff/team" className="btn btn-navy">Manage team</Link></div>}
        {me.role === "proprietor" && <div className="panel"><h2 className="serif">News &amp; events</h2><p>Post school news and events. The latest appear on the homepage.</p><Link href="/staff/news" className="btn btn-navy">Manage news</Link></div>}
        <div className="panel">
          <h2 className="serif">Student ranking</h2>
          <p>Ranking is currently <strong>{on ? "ON" : "OFF"}</strong>. When on, students see their position and the top of their class.</p>
          <form action={toggleRanking}><button className="btn btn-gold">{on ? "Switch ranking off" : "Switch ranking on"}</button></form>
        </div>
      </div>
    </div></section>
  );
}
