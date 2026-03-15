import { contentfulClient } from "../lib/contentful";

async function safeGetEntries(query: Record<string, unknown>) {
  try {
    const res = await contentfulClient.getEntries(query);
    return res?.items ?? [];
  } catch (err) {
    console.error("Contentful fetch failed:", err);
    return [];
  }
}

export async function getHeroContent() {
  return await safeGetEntries({
    content_type: "heroSection",
  });
}

export async function getServices() {
  return await safeGetEntries({
    content_type: "services",
  });
}

export async function getPortfolio() {
  return await safeGetEntries({
    content_type: "portfolio",
  });
}

export async function getAbout() {
  return await safeGetEntries({
    content_type: "about",
  });
}

export async function getContact() {
  return await safeGetEntries({
    content_type: "contact",
  });
}

export async function getSupermarketFlyers() {
  return await safeGetEntries({
    content_type: "supermarketFlyers",
  });
}

export async function getProjectBySlug(slug: string) {
  const entries = await safeGetEntries({
    content_type: "portfolioProject",
    "fields.slug": slug,
    limit: 1,
  });
  return entries?.length > 0 ? entries[0] : null;
}

export function contentfulAssetUrl(asset: any): string | null {
  const url = asset?.fields?.file?.url;
  if (typeof url !== "string" || !url.length) return null;
  const fullUrl = url.startsWith("//") ? `https:${url}` : url;
  
  // Append Contentful Image API parameters for compression and modern formatting
  try {
    const urlObj = new URL(fullUrl);
    urlObj.searchParams.set('fm', 'webp');
    urlObj.searchParams.set('q', '75');
    return urlObj.toString();
  } catch (e) {
    // Fallback if URL parsing fails for some reason
    const separator = fullUrl.includes('?') ? '&' : '?';
    return `${fullUrl}${separator}fm=webp&q=75`;
  }
}
