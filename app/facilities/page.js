import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
export const metadata = { title: "Facilities", description: "Classrooms, laboratory and campus at Heightville Academy, Akure." };
// Based on the supplied photographs. Add descriptions when the school provides them.
const items = [
  { photo: "classroom-maths", name: "Classrooms", alt: "A bright classroom with students at wooden desks", text: "Bright classrooms with wooden desks and benches and a whiteboard for each class." },
  { photo: "lab-chemistry", name: "Science laboratory", alt: "A laboratory bench with chemistry equipment", text: "A laboratory with workbenches and apparatus for practical science lessons." },
  { photo: "secondary-block", name: "Secondary School building", alt: "The two-storey Secondary School building", text: "A two-storey building that houses the Secondary Arm, which moved to its present site in 2023." },
  { photo: "grounds", name: "Campus grounds", alt: "Lawn and trees on the school grounds", text: "Landscaped grounds with lawns and trees." },
];

export default function Facilities() {
  return (
    <>
      <PageHero title="Facilities" intro="A modern, spacious environment for teaching and learning." />
      <section className="section"><div className="wrap fac">
        {items.map((f) => (
          <article key={f.name} className="fac-item">
            <figure className="frame"><Photo name={f.photo} alt={f.alt} sizes="(min-width:900px) 50vw, 100vw" /></figure>
            <div><h2 className="serif">{f.name}</h2><span className="rule" aria-hidden="true" /><p>{f.text}</p></div>
          </article>
        ))}
        <p className="note">More facilities: information coming soon. Please contact the school for details.</p>
      </div></section>
    </>
  );
}
