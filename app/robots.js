import { site } from "@/data/site";
export default function robots() {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/student", "/staff", "/student-portal", "/staff-portal"] }, sitemap: `${site.url}/sitemap.xml` };
}
