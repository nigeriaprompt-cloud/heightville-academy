import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";
export const metadata = { title: "Admissions", description: "Enquire about admission into Heightville Academy, Akure." };

export default function Admissions() {
  return (
    <>
      <PageHero title="Admissions" intro="We welcome enquiries from parents and guardians." />
      <section className="section"><div className="wrap two">
        <div>
          <SectionHeading eyebrow="How to apply" title="Admission information" />
          <div className="prose">
            <p>Admission requirements, procedures, fees and key dates: information coming soon. Please contact the school for more information.</p>
            <p>Heightville Academy admits children into its Creche, Nursery, Primary and Secondary programs.</p>
          </div>
        </div>
        <div className="quote">
          <h2 className="serif">Make an enquiry</h2>
          <p>The quickest way to reach the school is by WhatsApp or phone.</p>
          <div className="actions">
            <a className="btn btn-navy" href={site.whatsappLink}>WhatsApp {site.whatsapp}</a>
            <a className="btn btn-outline-dark" href={site.phoneLink}>Call {site.phone}</a>
          </div>
        </div>
      </div></section>
    </>
  );
}
