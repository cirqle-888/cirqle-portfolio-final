import { c } from "./contentful-9eS7a33o.js";
const o = c({ space: "dummy_space", accessToken: "dummy_token" });
async function e(n) {
  try {
    return (await o.getEntries(n))?.items ?? [];
  } catch (t) {
    return (console.error("Contentful fetch failed:", t), []);
  }
}
async function u() {
  return await e({ content_type: "heroSection" });
}
async function l() {
  return await e({ content_type: "services" });
}
async function f() {
  return await e({ content_type: "portfolio" });
}
async function y() {
  return await e({ content_type: "about" });
}
async function p() {
  return await e({ content_type: "contact" });
}
async function g() {
  return await e({ content_type: "supermarketFlyers" });
}
async function m(n) {
  const t = await e({ content_type: "portfolio", "fields.slug": n, limit: 1 });
  return t?.length > 0 ? t[0] : null;
}
function h(n) {
  const t = n?.fields?.file?.url;
  if (typeof t != "string" || !t.length) return null;
  const s = t.startsWith("//") ? `https:${t}` : t;
  try {
    const r = new URL(s);
    return (r.searchParams.set("fm", "webp"), r.searchParams.set("q", "75"), r.toString());
  } catch {
    const a = s.includes("?") ? "&" : "?";
    return `${s}${a}fm=webp&q=75`;
  }
}
export { g as a, l as b, h as c, p as d, m as e, y as f, u as g, f as h };
