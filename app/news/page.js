import PageHero from "@/components/PageHero";
import NewsList from "@/components/NewsList";
import { latestNews } from "@/lib/news";
export const metadata = { title: "News & Events", description: "News and announcements from Heightville Academy." };
export const revalidate = 60;

export default async function News() {
  const items = await latestNews(50);
  return (
    <>
      <PageHero title="News & Events" intro="The latest from Heightville Academy." />
      <section className="section"><div className="wrap narrow">
        {items.length ? <NewsList items={items} /> : <p className="note">No news or events have been posted yet. Please check back soon.</p>}
      </div></section>
    </>
  );
}
