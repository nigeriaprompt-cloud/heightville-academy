import Link from "next/link";
import PageHero from "./PageHero";
import SectionHeading from "./SectionHeading";

// Sign-in screen only. It is intentionally inactive: real login needs a secure back end (step 2).
export default function PortalPage({ title, intro, idLabel, planned }) {
  return (
    <>
      <PageHero title={title} intro={intro} />
      <section className="section">
        <div className="wrap two">
          <form className="portal-form" aria-labelledby="portal-title">
            <h2 id="portal-title" className="serif">Sign in</h2>
            <p className="portal-note" role="status">Login is not active yet. The portal is being set up; please contact the school office for access.</p>
            <fieldset disabled>
              <label className="field">{idLabel}<input type="text" autoComplete="username" /></label>
              <label className="field">Password<input type="password" autoComplete="current-password" /></label>
              <button type="button" className="btn btn-navy" disabled>Sign in</button>
            </fieldset>
          </form>
          <div>
            <SectionHeading eyebrow="Coming soon" title="What this portal will offer" />
            <ul className="plist">{planned.map((t) => <li key={t}>{t}</li>)}</ul>
            <p className="note">Students can already practise in the <Link href="/learning" className="link">Learning Centre</Link>, which needs no login.</p>
          </div>
        </div>
      </section>
    </>
  );
}
