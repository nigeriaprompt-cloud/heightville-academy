import { nav, site } from "@/data/site";
export default function sitemap() {
  return nav.map(([, href]) => ({ url: `${site.url}${href === "/" ? "" : href}`, lastModified: new Date() }));
}
