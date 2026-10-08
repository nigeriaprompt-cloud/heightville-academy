"use client";
import { useEffect, useState } from "react";

const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);
const clock = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function Quiz({ questions, departments }) {
  const deptNames = Object.keys(departments);
  const [cfg, setCfg] = useState({ department: deptNames[0], subject: "All subjects", difficulty: "Any", count: 10, mode: "Practice" });
  const [set, setSet] = useState(null);
  const [run, setRun] = useState("Practice");
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [left, setLeft] = useState(0);

  const pool = questions.filter((q) => q.department === cfg.department &&
    (cfg.subject === "All subjects" || q.subject === cfg.subject) &&
    (cfg.difficulty === "Any" || q.difficulty === cfg.difficulty));

  useEffect(() => {
    if (!set || done || run !== "Timed exam") return;
    if (left <= 0) { setDone(true); return; }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [set, done, run, left]);

  const start = () => {
    const s = shuffle(pool).slice(0, cfg.count).map((q) => ({ ...q, options: shuffle(q.options) }));
    setSet(s); setRun(cfg.mode); setPos(0); setAnswers([]); setDone(false); setLeft(s.length * 60);
  };
  const pick = (opt) => {
    if (run === "Practice" && answers[pos]) return;
    const a = [...answers]; a[pos] = opt; setAnswers(a);
  };
  const field = (label, value, onChange, opts) => (
    <label className="field">{label}
      <select value={value} onChange={(e) => onChange(e.target.value)}>{opts.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  );

  if (!set) return (
    <div className="quiz">
      <div className="quiz-setup">
        {field("Department", cfg.department, (v) => setCfg({ ...cfg, department: v, subject: "All subjects" }), deptNames)}
        {field("Subject", cfg.subject, (v) => setCfg({ ...cfg, subject: v }), ["All subjects", ...departments[cfg.department]])}
        {field("Difficulty", cfg.difficulty, (v) => setCfg({ ...cfg, difficulty: v }), ["Any", "Easy", "Medium", "Hard"])}
        {field("Number of questions", cfg.count, (v) => setCfg({ ...cfg, count: +v }), [5, 10, 20, 40])}
        {field("Mode", cfg.mode, (v) => setCfg({ ...cfg, mode: v }), ["Practice", "Timed exam"])}
      </div>
      <p className="hint">{cfg.mode === "Practice" ? "Practice: see the answer and explanation after each question." : "Timed exam: one minute per question; answers are revealed at the end."}</p>
      <p>{pool.length} question{pool.length === 1 ? "" : "s"} available for this selection.</p>
      <button className="btn btn-navy" disabled={!pool.length} onClick={start}>Start</button>
    </div>
  );

  if (done) {
    const score = set.filter((q, i) => answers[i] === q.answer).length;
    return (
      <div className="quiz" aria-live="polite">
        <h3 className="serif">Score: {score} / {set.length} ({Math.round((score / set.length) * 100)}%)</h3>
        <p>{score} correct · {set.length - score} wrong</p>
        <ol className="review">
          {set.map((q, i) => (
            <li key={q.id} className={answers[i] === q.answer ? "ok" : "bad"}>
              <strong>{q.question}</strong>
              <span>Your answer: {answers[i] || "Not answered"}</span>
              <span>Correct answer: {q.answer}</span>
              <em>{q.explanation}</em>
            </li>
          ))}
        </ol>
        <div className="actions">
          <button className="btn btn-navy" onClick={start}>Try again</button>
          <button className="btn btn-outline-dark" onClick={() => setSet(null)}>Change settings</button>
        </div>
      </div>
    );
  }

  const q = set[pos];
  const revealed = run === "Practice" && answers[pos] !== undefined;
  return (
    <div className="quiz">
      <div className="quiz-top">
        <p className="eyebrow">{q.subject} · Question {pos + 1} of {set.length}</p>
        {run === "Timed exam" && <p className="timer" role="timer">⏱ {clock(left)}</p>}
      </div>
      <progress value={pos + 1} max={set.length} aria-label="Progress" />
      <fieldset>
        <legend className="serif">{q.question}</legend>
        {q.options.map((o) => {
          const state = revealed ? (o === q.answer ? "right" : answers[pos] === o ? "wrong" : "") : answers[pos] === o ? "sel" : "";
          return (
            <label key={o} className={`opt ${state}`}>
              <input type="radio" name={`q${q.id}`} checked={answers[pos] === o} onChange={() => pick(o)} /> {o}
            </label>
          );
        })}
      </fieldset>
      {revealed && <p className="explain" aria-live="polite"><strong>{answers[pos] === q.answer ? "Correct." : `Correct answer: ${q.answer}.`}</strong> {q.explanation}</p>}
      <div className="actions">
        {pos > 0 && <button className="btn btn-outline-dark" onClick={() => setPos(pos - 1)}>Previous</button>}
        {pos < set.length - 1
          ? <button className="btn btn-navy" onClick={() => setPos(pos + 1)}>Next</button>
          : <button className="btn btn-gold" onClick={() => setDone(true)}>Submit</button>}
      </div>
    </div>
  );
}
