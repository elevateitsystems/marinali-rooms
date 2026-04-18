import contentData from "@/data/content.json";

export type Language = "en" | "it" | "de";

export function getContent(lang: Language = "en") {
  return contentData.content[lang] || contentData.content.en;
}

/**
 * Returns settings from the static content.json file.
 * Used as a synchronous fallback when the database is unavailable.
 */
export function getDefaultSettings() {
  return contentData.settings;
}
