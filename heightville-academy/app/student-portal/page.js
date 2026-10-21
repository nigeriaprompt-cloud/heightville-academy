import { redirect } from "next/navigation";
import PageHero from "@/components/PageHero";
import ActionForm from "@/components/ActionForm";
import { configured } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { studentLogin } from "@/app/actions";
export const metadata = { title: "Student Portal", description: "Student sign-in for Heightville Academy.", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function StudentPortal() {
  const ready = configured();
  let s = null;
  if (ready) { try { s = await getSession(); } catch {} }
  if (s?.kind === "student") redirect("/student");
  return (
    <>
      <PageHero title="Student Portal" intro="Sign in with the password your school gave you." />
      <section className="section ivory"><div className="wrap narrow">
        {ready ? <ActionForm action={studentLogin} fields={[{ name: "password", label: "Your password", type: "password", required: true, auto: "current-password" }]} submit="Sign in"
          hint="Lost your password? Ask your teacher or the school office." />
          : <p className="portal-note" role="status">The portal is being set up. Please check back soon.</p>}
      </div></section>
    </>
  );
}
