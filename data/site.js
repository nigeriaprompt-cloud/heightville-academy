// Central school facts. Edit here; every page reads from this file.
export const site = {
  name: "Heightville Academy",
  motto: "Raising Generation of Achievers",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://heightville-academy.vercel.app",
  address: ["Tunbo Oniya Avenue,", "Off Ife Road,", "Akure, Ondo State, Nigeria."],
  whatsapp: "08150752424",
  whatsappLink: "https://wa.me/2348150752424",
  phone: "08107492222",
  phoneLink: "tel:+2348107492222",
  mapQuery: "Tunbo Oniya Avenue, Off Ife Road, Akure, Ondo State, Nigeria",
};
export const nav = [
  ["Home", "/"], ["About", "/about"], ["Academics", "/academics"], ["Programs", "/programs"],
  ["Admissions", "/admissions"], ["Facilities", "/facilities"], ["Gallery", "/gallery"],
  ["News", "/news"], ["Learning", "/learning"], ["Play & Learn", "/play"], ["Contact", "/contact"],
];
// All taken from the school's brief history document.
export const facts = {
  established: "16 September 2019",
  founders: "Professor J. A. Adeyemi and Mrs. A. A. Adeyemi",
  staff: 35,
  vision: "To raise generations of achievers.",
  mission: "To provide a conducive learning environment that fosters the realization of students’ potentials academically, socially, morally, and emotionally.",
  clubs: ["Quiz and Debate Club", "Spelling Bee Club", "Writers’ Club"],
  timeline: [
    ["2019", "Heightville Academy was established on 16 September 2019. The Primary Arm began the 2019/2020 session with 56 pupils."],
    ["2021", "The Secondary Arm commenced on 20 September 2021 with 27 students in JSS 1, initially sharing classrooms with the Primary Arm."],
    ["2023", "The Secondary Arm moved to its present modern, spacious and conducive environment."],
  ],
};
