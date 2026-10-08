"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { photos } from "@/data/photos";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const links = nav.filter(([l]) => l !== "Home");
  return (
    <>
      <div className="topbar">
        <div className="wrap topbar-in">
          <span className="serif topbar-motto">“{site.motto}”</span>
          <span className="topbar-links">
            <a href={site.phoneLink}><Phone size={14} aria-hidden="true" /> {site.phone}</a>
            <a href={site.whatsappLink}>WhatsApp {site.whatsapp}</a>
          </span>
        </div>
      </div>
      <header className="nav">
        <div className="nav-in">
          <Link href="/" className="nav-logo" aria-label={`${site.name} home`}>
            <Image src={photos.logo.src} alt="" width={photos.logo.width} height={photos.logo.height} priority style={{ width: "auto", height: "58px" }} />
            <span className="nav-name serif">Heightville<small>Academy</small></span>
          </Link>
          <nav aria-label="Main" className="nav-links">
            {links.map(([label, href]) => (
              <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>
            ))}
          </nav>
          <Link href="/admissions" className="btn btn-navy nav-cta">Apply for Admission</Link>
          <button className="nav-toggle" aria-expanded={open} aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="mobile-menu">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>
            ))}
            <Link href="/admissions" className="btn btn-gold">Apply for Admission</Link>
          </nav>
        )}
      </header>
    </>
  );
}
