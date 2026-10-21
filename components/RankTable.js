export default function RankTable({ rows, meId, title }) {
  if (!rows.length) return <p className="hint">No scores yet in this class.</p>;
  const top = rows.slice(0, 10), me = rows.find((r) => r.id === meId);
  const list = me && !top.includes(me) ? [...top, me] : top;
  return (
    <div className="table-wrap">
      <table className="table">
        <caption className="sr">{title}</caption>
        <thead><tr><th>Rank</th><th>Name</th><th>Average</th><th>Tests</th></tr></thead>
        <tbody>{list.map((r) => <tr key={r.id} className={r.id === meId ? "me" : ""}><td>{r.rank}</td><td>{r.name}{r.id === meId && " (you)"}</td><td>{r.avg}%</td><td>{r.count}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
