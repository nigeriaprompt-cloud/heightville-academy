import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { founders } from "@/data/founders";
import { photos } from "@/data/photos";

export default function Founders() {
  return (
    <section className="section ivory">
      <div className="wrap">
        <SectionHeading eyebrow="Our Founders" title="The vision behind Heightville Academy"
          text="Heightville Academy was established in 2019 with a vision of providing qualitative, affordable and world-class education." />
        <ul className="founders">
          {founders.map((f) => (
            <li key={f.name} className="founder">
              <div className="founder-photo">
                <Image src={photos[f.photo].src} alt={f.alt} fill sizes="(min-width:760px) 30vw, 80vw" style={{ objectFit: "cover", objectPosition: "top" }} />
              </div>
              <h3 className="serif">{f.name}</h3>
              <p>{f.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
