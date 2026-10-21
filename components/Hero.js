import Link from "next/link";
import Image from "next/image";
import { photos } from "@/data/photos";

export default function Hero() {
  return (
    <section className="hero">
      <Image src={photos.hero.src} alt="The Heightville Academy Secondary School building" fill priority sizes="100vw" className="hero-img" />
      <div className="hero-overlay" />
      <div className="wrap hero-body fade-up">
        <p className="eyebrow">Heightville Academy · Akure, Ondo State</p>
        <h1 className="serif">Raising a Generation of Achievers</h1>
        <span className="rule" aria-hidden="true" />
        <p className="hero-sub">A co-educational Primary and Secondary school committed to academic excellence, moral discipline and character development.</p>
        <div className="actions">
          <Link href="/about" className="btn btn-gold">Explore Our School</Link>
          <Link href="/admissions" className="btn btn-outline">Admissions</Link>
        </div>
      </div>
    </section>
  );
}
