import Link from "next/link";
import { requireStudent } from "@/lib/auth";
import { logout } from "@/app/actions";
export const metadata = { title: "My Dashboard", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function StudentLayout({ children }) {
  const me = await requireStudent();
  return (
    <div className="dash">
      <div className="dash-bar"><div className="wrap dash-bar-in">
        <p><strong>{me.name}</strong> · {me.class_level}</p>
        <nav aria-label="Student" className="subnav"><Link href="/student">Dashboard</Link><Link href="/student/practice">Practice</Link></nav>
        <form action={logout}><button className="btn btn-outline-dark sm">Sign out</button></form>
      </div></div>
      {children}
    </div>
  );
}
