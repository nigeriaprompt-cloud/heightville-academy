import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";
export const metadata = { title: "Contact", description: "Contact Heightville Academy by phone or WhatsApp, or visit us in Akure." };

export default function Contact() {
  return (<><PageHero title="Contact" intro="We would be glad to hear from you." /><ContactSection /></>);
}
