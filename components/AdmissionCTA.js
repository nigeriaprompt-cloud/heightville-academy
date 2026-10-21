import Link from "next/link";
import { site } from "@/data/site";

export default function AdmissionCTA() {
  return (
    <section className="cta">
      <div className="wrap">
        <h2 className="serif">Begin your child’s journey with us</h2>
        <p>Contact the school to ask about admission into Heightville Academy.</p>
        <div className="actions">
          <Link href="/admissions" className="btn btn-gold">Admissions</Link>
          <a href={site.whatsappLink} className="btn btn-outline">Chat on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
