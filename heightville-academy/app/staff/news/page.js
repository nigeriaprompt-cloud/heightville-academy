import { db } from "@/lib/db";
import { requireProprietor } from "@/lib/auth";
import { createNews, deleteNews } from "@/app/actions";
import { newsDate } from "@/lib/news";
export const dynamic = "force-dynamic";

export default async function StaffNews({ searchParams }) {
  await requireProprietor();
  const { data: list } = await db().from("news").select("*").order("created_at", { ascending: false });
  return (
    <section className="section"><div className="wrap">
      <h1 className="serif dash-title">News &amp; events</h1>
      {searchParams.err && <p className="form-error" role="alert">Enter a title and the text.</p>}
      {searchParams.ok && <p className="form-ok" role="status">Published. It now appears on the website.</p>}
      <div className="panel"><h2 className="serif">Post something new</h2>
        <form action={createNews} className="portal-form">
          <label className="field">Type<select name="kind"><option>News</option><option>Event</option></select></label>
          <label className="field">Title<input name="title" required maxLength={120} /></label>
          <label className="field">Date of the event (events only)<input name="event_date" type="date" /></label>
          <label className="field">Text<textarea name="body" rows="6" required /></label>
          <button className="btn btn-navy">Publish</button>
        </form></div>
      <div className="panel"><h2 className="serif">{list?.length || 0} posted</h2>
        {!list?.length ? <p className="hint">Nothing posted yet. The homepage hides the news section until you post something.</p> : (
          <ul className="rowlist">{list.map((n) => (
            <li key={n.id}><div><strong>{n.title}</strong><span>{n.kind} · {newsDate(n)}</span></div>
              <details className="remove"><summary>Delete</summary><form action={deleteNews}><input type="hidden" name="id" value={n.id} /><button className="btn btn-danger sm">Yes, delete</button></form></details></li>))}</ul>)}
      </div>
    </div></section>
  );
}
