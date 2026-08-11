import { contentfulClient } from "../lib/contentful";

// Only content types that actually exist in the Contentful space are queried
// here (`portfolio`, `supermarketFlyers`). Querying unknown types returns a
// 400 InvalidQuery from Contentful, so keep this list in sync with the space.
async function safeGetEntries(query: Record<string, unknown>) {
  try {
    const res = await contentfulClient.getEntries(query);
    return res?.items ?? [];
  } catch (err) {
    console.error("Contentful fetch failed:", err);
    return [];
  }
}

export async function getPortfolio() {
  return await safeGetEntries({
    content_type: "portfolio",
    include: 2,
  });
}

export async function getSupermarketFlyers() {
  return await safeGetEntries({
    content_type: "supermarketFlyers",
  });
}

export function contentfulAssetUrl(asset: any): string | null {
  const url = asset?.fields?.file?.url;
  if (typeof url !== "string" || !url.length) return null;
  const fullUrl = url.startsWith("//") ? `https:${url}` : url;

  // Append Contentful Image API parameters for compression and modern formatting
  try {
    const urlObj = new URL(fullUrl);
    urlObj.searchParams.set("fm", "webp");
    urlObj.searchParams.set("q", "75");
    return urlObj.toString();
  } catch (e) {
    // Fallback if URL parsing fails for some reason
    const separator = fullUrl.includes("?") ? "&" : "?";
    return `${fullUrl}${separator}fm=webp&q=75`;
  }
}
