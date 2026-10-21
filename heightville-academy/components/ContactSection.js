import { MapPin, Phone, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function ContactSection() {
  const map = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
  return (
    <section className="section">
      <div className="wrap two">
        <div>
          <SectionHeading eyebrow="Visit &amp; Enquire" title="Contact Heightville Academy" />
          <ul className="contact-list">
            <li><MapPin size={20} aria-hidden="true" /><address>{site.address.map((l) => <span key={l}>{l}<br /></span>)}</address></li>
            <li><MessageCircle size={20} aria-hidden="true" /><a href={site.whatsappLink}>WhatsApp: {site.whatsapp}</a></li>
            <li><Phone size={20} aria-hidden="true" /><a href={site.phoneLink}>Enquiries: {site.phone}</a></li>
          </ul>
        </div>
        <iframe title="Map showing Heightville Academy location" src={map} loading="lazy" className="map" />
      </div>
    </section>
  );
}
