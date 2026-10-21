"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const clock = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

// Shows questions, runs the countdown (auto-submits at zero) and sends answers to the server for marking.
export default function ExamRunner({ title, questions, seconds, submit }) {
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState({});
  const [left, setLeft] = useState(seconds);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const sent = useRef(false);
  const latest = useRef(answers);
  latest.current = answers;

  const send = async () => {
    if (sent.current) return;
    sent.current = true; setBusy(true); setError("");
    try {
      const r = await submit(latest.current);
      if (r?.error) { sent.current = false; setError(r.error); } else setResult(r);
    } catch { sent.current = false; setError("Could not submit. Check your connection and try again."); }
    setBusy(false);
  };
  useEffect(() => {
    if (left === null || result) return;
    if (left <= 0) { send(); return; }
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left, result]);

  if (result) return (
    <div className="runner" aria-live="polite">
      <p className="eyebrow">{title}</p>
      {result.late && <p className="form-error">Time had run out, so this attempt was not marked.</p>}
      <h2 className="serif">Score: {result.score} / {result.total} ({result.percent}%) · Grade {result.grade}</h2>
      <ol className="review">
        {result.review.map((r, i) => (
          <li key={i} className={r.ok ? "ok" : "bad"}>
            <strong>{r.question}</strong>
            <span>Your answer: {r.yours || "Not answered"}</span>
            <span>Correct answer: {r.correct}</span>
            {r.explanation && <em>{r.explanation}</em>}
          </li>
        ))}
      </ol>
      <Link href="/student" className="btn btn-navy">Back to my dashboard</Link>
    </div>
  );

  const q = questions[pos], answered = Object.keys(answers).length;
  return (
    <div className="runner">
      <div className="quiz-top">
        <p className="eyebrow">{title} · Question {pos + 1} of {questions.length}</p>
        {left !== null && <p className={`timer ${left < 60 ? "low" : ""}`} role="timer">⏱ {clock(Math.max(0, left))}</p>}
      </div>
      <div className="palette" role="group" aria-label="Question numbers">
        {questions.map((x, i) => <button key={x.id} type="button" className={`${i === pos ? "cur" : ""} ${answers[x.id] ? "done" : ""}`} onClick={() => setPos(i)} aria-label={`Question ${i + 1}${answers[x.id] ? ", answered" : ""}`}>{i + 1}</button>)}
      </div>
      <fieldset>
        <legend className="serif">{q.question}</legend>
        {q.options.map((o, i) => (
          <label key={o} className={`opt ${answers[q.id] === o ? "sel" : ""}`}>
            <input type="radio" name={`q-${q.id}`} checked={answers[q.id] === o} onChange={() => setAnswers({ ...answers, [q.id]: o })} />
            <b>{"ABCD"[i]}.</b> {o}
          </label>
        ))}
      </fieldset>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="actions">
        {pos > 0 && <button className="btn btn-outline-dark" onClick={() => setPos(pos - 1)}>Previous</button>}
        {pos < questions.length - 1 && <button className="btn btn-navy" onClick={() => setPos(pos + 1)}>Next</button>}
        <button className="btn btn-gold" disabled={busy} onClick={() => { if (answered === questions.length || confirm(`You have answered ${answered} of ${questions.length}. Submit now?`)) send(); }}>{busy ? "Submitting…" : "Submit"}</button>
      </div>
    </div>
  );
}
