import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import { gallery } from "@/data/gallery";
export const metadata = { title: "Gallery", description: "Photographs from Heightville Academy." };

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" intro="Moments from school life." />
      <section className="section"><div className="wrap"><Gallery items={gallery} /></div></section>
    </>
  );
}
