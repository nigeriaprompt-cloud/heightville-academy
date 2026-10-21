import PortalPage from "@/components/PortalPage";
export const metadata = { title: "Student Portal", description: "Student sign-in for Heightville Academy.", robots: { index: false } };

export default function StudentPortal() {
  return <PortalPage title="Student Portal" intro="Sign in to take exams and see your results."
    idLabel="Student ID" planned={["Take exams and practice tests set by your teachers", "See your scores and answer reviews", "Access learning materials"]} />;
}
