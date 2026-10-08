import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import { facts } from "@/data/site";
export const metadata = { title: "Academics", description: "Academic life at Heightville Academy: excellence, discipline, practical science and co-curricular clubs." };

export default function Academics() {
  return (
    <>
      <PageHero title="Academics" intro="Academic excellence, moral discipline and character development." />
      <section className="section"><div className="wrap two center">
        <div className="prose">
          <p>The school emphasises academic excellence alongside social responsibility, character development and spiritual growth, preparing students to become responsible, confident, productive and successful members of society.</p>
          <p className="note">Curriculum, subjects and class details: information coming soon. Please contact the school for more information.</p>
        </div>
        <figure className="frame"><Photo name="classroom-maths" alt="Students in a Mathematics lesson on linear equations" /></figure>
      </div></section>
      <section className="section navy"><div className="wrap two center">
        <figure className="frame dark"><Photo name="lab-experiment" alt="Students setting up laboratory apparatus" /></figure>
        <SectionHeading eyebrow="Practical learning" title="Science in practice" text="Students learn through hands-on laboratory work alongside their lessons." />
      </div></section>
      <section className="section"><div className="wrap">
        <SectionHeading eyebrow="Co-curricular" title="Students’ Clubs" />
        <ul className="clubs">{facts.clubs.map((c, i) => <li key={c}><span className="serif">{String(i + 1).padStart(2, "0")}</span>{c}</li>)}</ul>
      </div></section>
    </>
  );
}
