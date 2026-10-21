import { configured, db } from "./db";

// Returns [] when the portal is not set up or there is no news, so pages can simply hide the section.
export async function latestNews(limit = 3) {
  if (!configured()) return [];
  try {
    const { data } = await db().from("news").select("*").order("created_at", { ascending: false }).limit(limit);
    return data || [];
  } catch { return []; }
}
export const newsDate = (n) => new Date(n.event_date || n.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
