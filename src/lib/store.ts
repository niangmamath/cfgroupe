import { put, head } from "@vercel/blob";
import { unstable_noStore as noStore } from "next/cache";
import type { SiteContent, SiteTheme, SectionOrderEntry } from "./content-types";
import { defaultContent } from "./default-content";
import { defaultTheme } from "./default-theme";

const CONTENT_PATH = "cms/content.json";
const THEME_PATH = "cms/theme.json";

const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

async function readJson<T>(pathname: string): Promise<T | null> {
  // Opts this whole call out of Next's Data Cache — otherwise the fetch
  // @vercel/blob's `head()` makes internally can get cached, freezing the
  // etag we use for cache-busting and serving a stale snapshot forever.
  noStore();
  if (!hasBlob()) return null;
  try {
    // `head()` looks up the blob directly by pathname (strongly consistent),
    // unlike `list()` which can lag behind a just-completed `put()`.
    const meta = await head(pathname).catch(() => null);
    if (!meta) return null;
    // Cache-bust with the etag so we never get a CDN-cached response for a
    // pathname we just overwrote.
    const res = await fetch(`${meta.url}?v=${meta.etag}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.error(`store: failed to read ${pathname}`, err);
    return null;
  }
}

async function writeJson(pathname: string, data: unknown): Promise<void> {
  if (!hasBlob()) {
    throw new Error(
      "Vercel Blob n'est pas configuré (BLOB_READ_WRITE_TOKEN manquant)."
    );
  }
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function getContent(): Promise<SiteContent> {
  const stored = await readJson<Partial<SiteContent>>(CONTENT_PATH);
  if (!stored) return defaultContent;
  // shallow-merge top-level keys so newly-added fields still get defaults
  const merged = { ...defaultContent, ...stored };
  // deep-merge hero so content saved before `mediaPublished` existed still gets it
  merged.hero = { ...defaultContent.hero, ...stored.hero };
  // content saved before `sections`/`sectionOrder`/`homeSections` existed won't have them
  merged.homeSections = merged.homeSections ?? [];
  merged.presence = merged.presence ?? defaultContent.presence;
  merged.trustedSection = merged.trustedSection ?? defaultContent.trustedSection;
  merged.homeSectionOrder = merged.homeSectionOrder ?? defaultContent.homeSectionOrder;
  // content saved before "presence"/"trustedLogos" existed won't have them in the
  // order list yet — append them (before "contact" if present) rather than reset
  const existingFixedKeys = new Set(
    merged.homeSectionOrder.filter((e) => e.kind === "fixed").map((e) => e.key)
  );
  const missingFixed: SectionOrderEntry[] = (["presence", "trustedLogos"] as const)
    .filter((key) => !existingFixedKeys.has(key))
    .map((key) => ({ kind: "fixed" as const, key }));
  if (missingFixed.length > 0) {
    const contactIdx = merged.homeSectionOrder.findIndex(
      (e) => e.kind === "fixed" && e.key === "contact"
    );
    merged.homeSectionOrder =
      contactIdx >= 0
        ? [
            ...merged.homeSectionOrder.slice(0, contactIdx),
            ...missingFixed,
            ...merged.homeSectionOrder.slice(contactIdx),
          ]
        : [...merged.homeSectionOrder, ...missingFixed];
  }
  merged.entities = merged.entities.map((e) => ({
    ...e,
    sections: e.sections ?? [],
    sectionOrder:
      e.sectionOrder ?? [
        { kind: "fixed", key: "groups" },
        { kind: "fixed", key: "synergy" },
      ],
  }));
  return merged;
}

export async function getTheme(): Promise<SiteTheme> {
  const stored = await readJson<Partial<SiteTheme>>(THEME_PATH);
  if (!stored) return defaultTheme;
  return {
    colors: { ...defaultTheme.colors, ...stored.colors },
    typography: { ...defaultTheme.typography, ...stored.typography },
  };
}

export async function saveContent(content: SiteContent): Promise<void> {
  await writeJson(CONTENT_PATH, content);
}

export async function saveTheme(theme: SiteTheme): Promise<void> {
  await writeJson(THEME_PATH, theme);
}

export function isBlobConfigured(): boolean {
  return hasBlob();
}
