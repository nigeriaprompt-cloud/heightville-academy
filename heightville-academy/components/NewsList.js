import { newsDate } from "@/lib/news";

// preview = short cards for the homepage; otherwise the full text.
export default function NewsList({ items, preview = false }) {
  return (
    <ul className={preview ? "newsgrid" : "newsfull"}>
      {items.map((n) => (
        <li key={n.id} className="newscard">
          <p className="newsmeta"><span className={`badge ${n.kind === "Event" ? "ev" : ""}`}>{n.kind}</span> <time>{newsDate(n)}</time></p>
          <h3 className="serif">{n.title}</h3>
          <p className="newsbody">{preview && n.body.length > 150 ? `${n.body.slice(0, 150).trim()}…` : n.body}</p>
        </li>
      ))}
    </ul>
  );
}
