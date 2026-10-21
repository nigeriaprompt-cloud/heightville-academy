// Server-only helpers. Never import this file into a client component.
import { createCipheriv, createDecipheriv, createHmac, hkdfSync, randomBytes, randomInt, timingSafeEqual } from "node:crypto";

const secret = () => {
  const s = process.env.APP_SECRET;
  if (!s || s.length < 32) throw new Error("APP_SECRET is missing or shorter than 32 characters");
  return s;
};
const key = (label) => Buffer.from(hkdfSync("sha256", secret(), "heightville", label, 32));

// Fixed-length fingerprint used to look a password up without storing it in the clear.
// ci = case-insensitive (used for student passwords so a phone keyboard cannot cause a mismatch).
export const lookup = (password, ci = false) => {
  const p = String(password).trim();
  return createHmac("sha256", key("lookup")).update(ci ? p.toUpperCase() : p).digest("hex");
};

// Reversible encryption so authorised staff can read passwords in the app,
// while a copy of the database alone shows only scrambled text.
export function encrypt(text) {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key("enc"), iv);
  const ct = Buffer.concat([c.update(text, "utf8"), c.final()]);
  return [iv, c.getAuthTag(), ct].map((b) => b.toString("base64url")).join(".");
}
export function decrypt(blob) {
  try {
    const [iv, tag, ct] = blob.split(".").map((s) => Buffer.from(s, "base64url"));
    const d = createDecipheriv("aes-256-gcm", key("enc"), iv);
    d.setAuthTag(tag);
    return Buffer.concat([d.update(ct), d.final()]).toString("utf8");
  } catch { return "(cannot read)"; }
}

export function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${createHmac("sha256", key("sign")).update(body).digest("base64url")}`;
}
export function verify(token) {
  try {
    const [body, mac] = String(token).split(".");
    const good = createHmac("sha256", key("sign")).update(body).digest("base64url");
    const a = Buffer.from(mac), b = Buffer.from(good);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const p = JSON.parse(Buffer.from(body, "base64url").toString());
    return p.exp && p.exp < Date.now() ? null : p;
  } catch { return null; }
}
export const safeEqual = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; // no 0/O/1/I/L to avoid mix-ups
export const randomPassword = (n = 8) => Array.from({ length: n }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
