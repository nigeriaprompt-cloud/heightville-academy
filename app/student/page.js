import Link from "next/link";
import { db } from "@/lib/db";
import { isRankingOn, ranking, requireStudent } from "@/lib/auth";
import { gradeOf } from "@/lib/grade";
import RankTable from "@/components/RankTable";
export const dynamic = "force-dynamic";

export default async function StudentHome() {
  const me = await requireStudent();
  const [{ data: exams }, { data: atts }, on] = await Promise.all([
    db().from("exams").select("*").eq("published", true).in("class_level", [me.class_level, "All classes"]).order("created_at", { ascending: false }),
    db().from("attempts").select("*").eq("student_id", me.id).order("started_at", { ascending: false }),
    isRankingOn(),
  ]);
  const mine = Object.fromEntries((atts || []).filter((a) => a.exam_id).map((a) => [a.exam_id, a]));
  const done = (atts || []).filter((a) => a.submitted_at).slice(0, 15);
  const rows = on ? await ranking(me.class_level) : null;
  const myRank = rows?.find((r) => r.id === me.id);
  return (
    <section className="section"><div className="wrap">
      <h1 className="serif dash-title">Welcome, {me.name.split(" ")[0]}</h1>
      <div className="panel-grid">
        <div className="panel">
          <h2 className="serif">Exams from your teachers</h2>
          {!exams?.length ? <p className="hint">No exams are open for {me.class_level} right now.</p> : (
            <ul className="rowlist">{exams.map((e) => {
              const a = mine[e.id];
              return (
                <li key={e.id}>
                  <div><strong>{e.title}</strong><span>{e.subject} · {e.timed ? `Timed, ${e.duration_minutes} min` : "No time limit"}</span></div>
                  {a?.submitted_at ? <span className="badge ok">{a.score}/{a.total} · {gradeOf(Number(a.percent))}</span>
                    : <Link prefetch={false} href={`/student/exam/${e.id}`} className="btn btn-navy sm">{a ? "Continue" : "Open"}</Link>}
                </li>
              );
            })}</ul>
          )}
        </div>
        <div className="panel">
          <h2 className="serif">WAEC, NECO and JAMB practice</h2>
          <p>Practise objective questions in Science, Arts and Commercial subjects, in JAMB CBT style or WAEC/NECO style. Your scores count towards your average.</p>
          <Link href="/student/practice" className="btn btn-gold">Start practising</Link>
        </div>
      </div>

      <div className="panel">
        <h2 className="serif">Class ranking</h2>
        {rows === null ? <p className="hint">Your teacher has not opened the class ranking yet.</p> : (
          <>
            {myRank ? <p>You are <strong>number {myRank.rank}</strong> in {me.class_level} with an average of {myRank.avg}% over {myRank.count} test{myRank.count === 1 ? "" : "s"}.</p>
              : <p className="hint">Finish a test to appear in the ranking.</p>}
            <RankTable rows={rows} meId={me.id} title={`Ranking for ${me.class_level}`} />
          </>
        )}
      </div>

      <div className="panel">
        <h2 className="serif">My results</h2>
        {!done.length ? <p className="hint">Your finished tests will appear here.</p> : (
          <div className="table-wrap"><table className="table"><thead><tr><th>Test</th><th>Score</th><th>%</th><th>Grade</th><th>Date</th></tr></thead>
            <tbody>{done.map((a) => <tr key={a.id}><td>{a.label}</td><td>{a.score}/{a.total}</td><td>{Number(a.percent)}%</td><td>{gradeOf(Number(a.percent))}</td><td>{new Date(a.submitted_at).toLocaleDateString("en-GB")}</td></tr>)}</tbody></table></div>
        )}
      </div>
    </div></section>
  );
}
