import { questions } from "@/data/questions";

export default function QuestionOfTheDay() {
  const day = Math.floor(Date.now() / 86400000);
  const q = questions[day % questions.length];
  return (
    <aside className="qotd">
      <p className="eyebrow">Question of the Day</p>
      <p className="serif">{q.question}</p>
      <ul>{q.options.map((o) => <li key={o}>{o}</li>)}</ul>
      <details><summary>Show answer</summary><p><strong>{q.answer}</strong>. {q.explanation}</p></details>
    </aside>
  );
}
