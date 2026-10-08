import { MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export default function WhatsAppButton() {
  return (
    <a className="wa" href={site.whatsappLink} aria-label="Chat with Heightville Academy on WhatsApp">
      <MessageCircle size={22} aria-hidden="true" /><span>Chat with us</span>
    </a>
  );
}
