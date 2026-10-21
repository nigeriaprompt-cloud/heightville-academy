import Link from "next/link";
import { BookOpenCheck, Gamepad2, GraduationCap, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";

const cards = [
  { href: "/student-portal", Icon: GraduationCap, title: "Student Portal", text: "Sign in with your password to take exams, see your results and your class ranking.", cta: "Student login", dark: true },
  { href: "/staff-portal", Icon: ShieldCheck, title: "Staff Portal", text: "For teachers and the proprietor: set exams, manage students and share school news.", cta: "Staff login", dark: true },
  { href: "/learning", Icon: BookOpenCheck, title: "Exam Practice", text: "Free WAEC, NECO and JAMB-style objective questions. No login needed.", cta: "Start practising" },
  { href: "/play", Icon: Gamepad2, title: "Play & Learn", text: "Alphabet, counting, memory and the planets, for younger children.", cta: "Start playing" },
];

export default function PortalCards() {
  return (
    <section className="section ivory">
      <div className="wrap">
        <SectionHeading eyebrow="Portals & Learning" title="Learn, practise and stay connected" />
        <ul className="pcards">
          {cards.map(({ href, Icon, title, text, cta, dark }) => (
            <li key={href}>
              <Link href={href} className={`pc ${dark ? "pc-dark" : ""}`}>
                <span className="pc-icon" aria-hidden="true"><Icon size={26} /></span>
                <h3 className="serif">{title}</h3>
                <p>{text}</p>
                <span className="pc-cta">{cta} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
