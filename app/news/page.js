import PageHero from "@/components/PageHero";
import { news } from "@/data/news";
export const metadata = { title: "News & Events", description: "News and announcements from Heightville Academy." };

export default function News() {
  return (
    <>
      <PageHero title="News & Events" />
      <section className="section"><div className="wrap narrow">
        {news.map((n) => (
          <article key={n.id} className="news">
            <p className="eyebrow">{n.date}{n.placeholder && " · Placeholder"}</p>
            <h2 className="serif">{n.title}</h2><p>{n.text}</p>
          </article>
        ))}
      </div></section>
    </>
  );
}
