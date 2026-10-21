import { requireStudent } from "@/lib/auth";
import { sign } from "@/lib/crypto";
import { submitPractice } from "@/app/actions";
import { questions } from "@/data/questions";
import { departments } from "@/data/subjects";
import ExamRunner from "@/components/ExamRunner";
export const metadata = { title: "Practice", robots: { index: false } };
export const dynamic = "force-dynamic";

const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);
const MODES = { jamb: ["JAMB-style CBT (40 seconds per question)", 40, "JAMB CBT"], waec: ["WAEC/NECO objective (70 seconds per question)", 70, "WAEC/NECO"], free: ["Untimed practice", 0, "Practice"] };

export default async function Practice({ searchParams }) {
  await requireStudent();
  const { subject, count, mode } = searchParams;
  let run = null;
  if (subject && Object.hasOwn(MODES, mode)) {
    const dept = subject.startsWith("Mixed: ") ? subject.slice(7) : null;
    const pool = questions.filter((q) => (dept ? q.department === dept : q.subject === subject));
    const n = Math.min(parseInt(count, 10) || 10, pool.length);
    const picked = shuffle(pool).slice(0, n);
    if (n) run = {
      qs: picked.map((q) => ({ id: q.id, question: q.question, options: shuffle(q.options) })),
      seconds: MODES[mode][1] ? MODES[mode][1] * n : null,
      token: sign({ ids: picked.map((q) => q.id), label: `${MODES[mode][2]}: ${subject}`, subject: dept || subject, exp: Date.now() + 4 * 3600e3 }),
      title: `${MODES[mode][2]} · ${subject}`,
    };
  }
  return (
    <section className="section"><div className="wrap narrow">
      {run ? <ExamRunner key={run.token} title={run.title} questions={run.qs} seconds={run.seconds} submit={submitPractice.bind(null, run.token)} /> : (
        <form className="portal-form" method="get">
          <h1 className="serif">WAEC, NECO and JAMB practice</h1>
          <p className="hint">Original practice questions written in the style of the exams. Your result is saved and counts towards your average.</p>
          <label className="field">Subject
            <select name="subject">
              {Object.entries(departments).map(([d, subs]) => (
                <optgroup key={d} label={d}>
                  <option value={`Mixed: ${d}`}>Mixed: {d}</option>
                  {subs.map((s) => <option key={s}>{s}</option>)}
                </optgroup>
              ))}
            </select></label>
          <label className="field">Number of questions<select name="count" defaultValue="10"><option>5</option><option>10</option><option>20</option><option>40</option></select></label>
          <label className="field">Style<select name="mode">{Object.entries(MODES).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}</select></label>
          <button className="btn btn-gold">Start</button>
        </form>
      )}
    </div></section>
  );
}
