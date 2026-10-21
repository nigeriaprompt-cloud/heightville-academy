import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import Founders from "@/components/Founders";
import SectionHeading from "@/components/SectionHeading";
import { facts, site } from "@/data/site";
export const metadata = { title: "About the School", description: "The story, vision and mission of Heightville Academy, Akure." };

export default function About() {
  return (
    <>
      <PageHero title="About Heightville Academy" intro={`“${site.motto}”`} />
      <section className="section"><div className="wrap two">
        <div className="prose">
          <p>Heightville Academy was established on {facts.established} by {facts.founders}, with a vision of providing qualitative, affordable and world-class education to children and young people in Akure and other parts of Nigeria.</p>
          <p>From inception, the school has engaged competent, experienced, dedicated and highly motivated teachers who are passionate about mentoring students towards academic excellence and holistic personal development. The school currently has {facts.staff} academic staff members.</p>
          <p>Heightville Academy is a co-educational Primary and Secondary school committed to holistic education, with emphasis on academic excellence, moral discipline, social responsibility, character development and spiritual growth.</p>
        </div>
        <div>
          <div className="quote"><h2 className="serif">Vision</h2><p>{facts.vision}</p></div>
          <div className="quote"><h2 className="serif">Mission</h2><p>{facts.mission}</p></div>
        </div>
      </div></section>
      <Founders />
      <section className="section"><div className="wrap">
        <SectionHeading eyebrow="Our Story" title="Growing with purpose" />
        <ol className="timeline">{facts.timeline.map(([y, t]) => <li key={y}><strong className="serif">{y}</strong><p>{t}</p></li>)}</ol>
        <figure className="feature"><Photo name="secondary-block-dusk" alt="Evening view of the Secondary School building" sizes="100vw" /></figure>
      </div></section>
    </>
  );
}
