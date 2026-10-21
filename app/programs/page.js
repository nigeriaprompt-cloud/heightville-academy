import PageHero from "@/components/PageHero";
import ProgramCard from "@/components/ProgramCard";
import { programs } from "@/data/programs";
export const metadata = { title: "Programs", description: "Creche, Nursery, Primary and Secondary programs at Heightville Academy." };

export default function Programs() {
  return (
    <>
      <PageHero title="Programs" intro="Creche · Nursery · Primary · Secondary" />
      <section className="section"><div className="wrap grid4">{programs.map((p) => <ProgramCard key={p.slug} program={p} />)}</div></section>
    </>
  );
}
