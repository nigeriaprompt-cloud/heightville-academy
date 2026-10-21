import PageHero from "@/components/PageHero";
import ActionForm from "@/components/ActionForm";
import { configured } from "@/lib/db";
import { setupProprietor } from "@/app/actions";
export const metadata = { title: "Proprietor Setup", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function Setup() {
  const ready = configured() && Boolean(process.env.SETUP_CODE);
  return (
    <>
      <PageHero title="Proprietor Setup" intro="Create the proprietor account. This only works once." />
      <section className="section ivory"><div className="wrap narrow">
        {ready ? <ActionForm action={setupProprietor} submit="Create proprietor account"
          hint="Use the SETUP_CODE you saved in Vercel. After this, the proprietor adds teachers from the Team page."
          fields={[{ name: "code", label: "Setup code", type: "password", required: true },
            { name: "name", label: "Full name", required: true }, { name: "username", label: "Username", required: true, auto: "username" },
            { name: "password", label: "Password (6+ characters)", type: "text", required: true }]} />
          : <p className="portal-note" role="status">Add the environment variables first (see the README), then redeploy.</p>}
      </div></section>
    </>
  );
}
