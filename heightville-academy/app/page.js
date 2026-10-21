import Link from "next/link";
import Hero from "@/components/Hero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import ProgramCard from "@/components/ProgramCard";
import AdmissionCTA from "@/components/AdmissionCTA";
import ContactSection from "@/components/ContactSection";
import Gallery from "@/components/Gallery";
import Founders from "@/components/Founders";
import NewsList from "@/components/NewsList";
import PortalCards from "@/components/PortalCards";
import { latestNews } from "@/lib/news";
import { programs } from "@/data/programs";
import { gallery } from "@/data/gallery";
import { facts } from "@/data/site";

const why = [
  ["Dedicated teachers", `${facts.staff} academic staff who are competent, experienced and passionate about teaching and mentoring.`],
  ["Holistic education", "Academic, social, moral and emotional growth, as set out in the school’s mission."],
  ["A conducive environment", "A modern, spacious setting designed to make learning engaging and rewarding."],
  ["Clubs and activities", "Quiz and Debate, Spelling Bee and Writers’ clubs build confidence and communication."],
];

export const revalidate = 60;

export default async function Home() {
  const news = await latestNews(3);
  return (
    <>
      <Hero />
      <div className="wrap"><ul className="facts">
        <li><strong className="serif">2019</strong><span>Established</span></li>
        <li><strong className="serif">Co-ed</strong><span>Primary &amp; Secondary</span></li>
        <li><strong className="serif">{facts.staff}</strong><span>Academic staff</span></li>
        <li><strong className="serif">4</strong><span>Creche to Secondary</span></li>
      </ul></div>

      <section className="section">
        <div className="wrap two center">
          <div>
            <SectionHeading eyebrow="Welcome" title="A school built on excellence and character" />
            <div className="prose">
              <p>Established on {facts.established} by {facts.founders}, Heightville Academy provides qualitative, affordable and world-class education to children and young people in Akure and beyond.</p>
              <p>The school places strong emphasis on academic excellence, moral discipline, social responsibility, character development and spiritual growth.</p>
              <Link href="/about" className="link">Our story →</Link>
            </div>
          </div>
          <figure className="frame"><Photo name="secondary-block" alt="Heightville Academy Secondary School building with students outside" /></figure>
        </div>
      </section>

      <Founders />

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Programs" title="From Creche to Secondary" />
          <div className="grid4">{programs.map((p) => <ProgramCard key={p.slug} program={p} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Why Heightville Academy" title="What parents can expect" />
          <ol className="why">{why.map(([t, d], i) => (
            <li key={t}><span className="serif why-no">{String(i + 1).padStart(2, "0")}</span><h3 className="serif">{t}</h3><p>{d}</p></li>
          ))}</ol>
        </div>
      </section>

      <section className="section navy">
        <div className="wrap two center">
          <div>
            <SectionHeading eyebrow="Science &amp; Practical Learning" title="Learning by doing"
              text="Students in laboratory coats work with real apparatus, from test tubes and burettes to measuring equipment, under the guidance of their teachers." />
            <Link href="/academics" className="btn btn-gold">Academics</Link>
          </div>
          <div className="stack">
            <figure className="frame dark"><Photo name="science-demo" alt="A teacher guiding students through a laboratory experiment" /></figure>
            <figure className="frame dark"><Photo name="lab-chemistry" alt="Students working at a laboratory bench" /></figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Life at Heightville" title="Learning beyond the lesson"
            text="Clubs and co-curricular activities develop intellect, creativity, communication, confidence and collaboration." />
          <figure className="feature"><Photo name="classroom-maths" alt="Students in a Mathematics lesson" sizes="100vw" />
            <figcaption>Learning in the classroom</figcaption></figure>
          <ul className="clubs">{facts.clubs.map((c, i) => <li key={c}><span className="serif">{String(i + 1).padStart(2, "0")}</span>{c}</li>)}</ul>
        </div>
      </section>

      <section className="section ivory">
        <div className="wrap">
          <SectionHeading eyebrow="Gallery" title="A glimpse of school life" />
          <Gallery items={gallery.slice(0, 6)} />
          <p className="center-text"><Link href="/gallery" className="btn btn-outline-dark">View the full gallery</Link></p>
        </div>
      </section>
      {news.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHeading eyebrow="Latest" title="News & Events" />
            <NewsList items={news} preview />
            <p className="center-text"><Link href="/news" className="btn btn-outline-dark">All news and events</Link></p>
          </div>
        </section>
      )}

      <PortalCards />

      <AdmissionCTA />
      <ContactSection />
    </>
  );
}
