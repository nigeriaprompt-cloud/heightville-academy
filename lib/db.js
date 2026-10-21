import { createClient } from "@supabase/supabase-js";

export const configured = () =>
  Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && (process.env.APP_SECRET || "").length >= 32);

let client;
// Server-only client using the service role key (never exposed to the browser).
export const db = () => {
  if (!client) client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
  return client;
};
