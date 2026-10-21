import { redirect } from "next/navigation";
import PageHero from "@/components/PageHero";
import ActionForm from "@/components/ActionForm";
import { configured } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { staffLogin } from "@/app/actions";
export const metadata = { title: "Staff Portal", description: "Staff and proprietor sign-in for Heightville Academy.", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function StaffPortal() {
  const ready = configured();
  let s = null;
  if (ready) { try { s = await getSession(); } catch {} }
  if (s?.kind === "staff") redirect("/staff");
  return (
    <>
      <PageHero title="Staff Portal" intro="Sign in for teachers and the proprietor." />
      <section className="section ivory"><div className="wrap narrow">
        {ready ? <ActionForm action={staffLogin} fields={[
          { name: "username", label: "Username", required: true, auto: "username" },
          { name: "password", label: "Password", type: "password", required: true, auto: "current-password" }]} submit="Sign in"
          hint="Forgotten your password? The proprietor can show it to you." />
          : <p className="portal-note" role="status">The portal is being set up. Please check back soon.</p>}
      </div></section>
    </>
  );
}
