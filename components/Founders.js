import Photo from "./Photo";
import SectionHeading from "./SectionHeading";
import { founders } from "@/data/founders";

export default function Founders() {
  return (
    <section className="section ivory">
      <div className="wrap">
        <SectionHeading eyebrow="Our Founders" title="The vision behind Heightville Academy"
          text="Heightville Academy was established in 2019 with a vision of providing qualitative, affordable and world-class education." />
        <ul className="founders">
          {founders.map((f) => (
            <li key={f.name} className="founder">
              <div className="founder-photo"><Photo name={f.photo} alt={f.alt} sizes="(min-width:760px) 30vw, 80vw" /></div>
              <h3 className="serif">{f.name}</h3>
              <p>{f.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
