import PageHero from "@/components/PageHero";
import PlayLearn from "@/components/PlayLearn";
export const metadata = { title: "Play & Learn", description: "Alphabet flashcards, counting, memory and solar system activities for children." };

export default function Play() {
  return (
    <>
      <PageHero title="Play & Learn" intro="Fun activities for younger children: letters, counting, memory and the planets. Ask a grown-up to help the very little ones." />
      <section className="section ivory"><div className="wrap narrow"><PlayLearn /></div></section>
    </>
  );
}
