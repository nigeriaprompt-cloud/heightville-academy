import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/data/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

const description = "Heightville Academy is a co-educational Primary and Secondary school in Akure, Ondo State, Nigeria, with Creche and Nursery programs.";
export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Heightville Academy | Raising Generation of Achievers", template: "%s | Heightville Academy" },
  description,
  alternates: { canonical: "./" },
  openGraph: { title: "Heightville Academy | Raising Generation of Achievers", description, siteName: site.name, locale: "en_NG", type: "website" },
  icons: { icon: "/icon.png" },
};

const schema = {
  "@context": "https://schema.org", "@type": "School", name: site.name, foundingDate: "2019-09-16",
  telephone: "+2348107492222",
  address: { "@type": "PostalAddress", streetAddress: "Tunbo Oniya Avenue, Off Ife Road", addressLocality: "Akure", addressRegion: "Ondo State", addressCountry: "NG" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NG" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
