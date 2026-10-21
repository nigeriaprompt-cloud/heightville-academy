import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { logout } from "@/app/actions";
export const metadata = { title: "Staff Dashboard", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function StaffLayout({ children }) {
  const me = await requireStaff();
  return (
    <div className="dash">
      <div className="dash-bar"><div className="wrap dash-bar-in">
        <p><strong>{me.name}</strong> · {me.role === "proprietor" ? "Proprietor" : "Teacher"}</p>
        <nav aria-label="Staff" className="subnav">
          <Link href="/staff">Dashboard</Link><Link href="/staff/students">Students</Link><Link href="/staff/exams">Exams</Link>
          {me.role === "proprietor" && <><Link href="/staff/news">News</Link><Link href="/staff/team">Team</Link></>}
        </nav>
        <form action={logout}><button className="btn btn-outline-dark sm">Sign out</button></form>
      </div></div>
      {children}
    </div>
  );
}
