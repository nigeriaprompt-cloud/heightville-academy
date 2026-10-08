import Link from "next/link";

export default function ProgramCard({ program }) {
  return (
    <article className="pcard">
      <span className="pcard-no serif" aria-hidden="true">{program.no}</span>
      <h3 className="serif">{program.name}</h3>
      <span className="rule" aria-hidden="true" />
      <p>{program.text}</p>
      <Link href="/programs" className="link">Learn More →</Link>
    </article>
  );
}
