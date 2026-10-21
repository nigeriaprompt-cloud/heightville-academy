import PortalPage from "@/components/PortalPage";
export const metadata = { title: "Staff Portal", description: "Staff and proprietor sign-in for Heightville Academy.", robots: { index: false } };

export default function StaffPortal() {
  return <PortalPage title="Staff Portal" intro="Sign in for teachers and school management."
    idLabel="Staff ID or email" planned={["Teachers: set questions and exams for their classes", "Teachers: see student results", "Proprietor: sign in to oversee the school’s portal activity"]} />;
}
