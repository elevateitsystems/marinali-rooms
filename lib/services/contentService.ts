import { cache } from "react";
import { unstable_cache, revalidateTag } from "next/cache";

export class ContentService {
  private static CACHE_TTL = 60; // 60 seconds

  private static getCacheKey(page: string, lang: string) {
    return `page:${page}:${lang}`;
  }

  /**
   * High-Performance fetching: Redis -> DB fallback
   * Wrapped in Next.js Data Cache (unstable_cache) for ISR/SSG support
   */
  private static fetchContentCached = unstable_cache(
    async (page: string, lang: string) => {
      const cacheKey = this.getCacheKey(page, lang);
      const redis = (await import("@/lib/redis")).default;

      // 1. Try Redis
      if (redis) {
        try {
          const cached = await redis.get(cacheKey);
          if (cached) {
            console.log(`[ContentService] Redis hit for ${cacheKey}`);
            return typeof cached === 'string' ? JSON.parse(cached) : cached;
          }
        } catch (error: any) {
          if (!error.message?.includes('Dynamic server usage')) {
            console.error("[ContentService] Redis error:", error);
          }
        }
      }

      // 2. Fallback to DB
      console.log(`[ContentService] Cache miss. Fetching DB for ${page}:${lang}`);
      const prisma = (await import("@/lib/prisma")).default;
      const content = await prisma.pageContent.findUnique({
        where: {
          page_lang: {
            page,
            lang,
          },
        },
      });

      if (!content) {
        console.log(`[ContentService] DB miss for ${page}:${lang}. Using local JSON...`);
        const contentData = require("@/data/content.json");
        const fallbackSections = contentData.content[lang]?.[page] || contentData.content.en?.[page];
        
        return {
          _id: 'fallback',
          page,
          lang,
          sections: fallbackSections || {},
        };
      }

      const result = {
        _id: content.id,
        page: content.page,
        lang: content.lang,
        sections: content.sections,
      };

      // 3. Backfill Redis
      if (redis) {
        redis.set(cacheKey, JSON.stringify(result), { ex: 3600 }).catch(() => {});
      }

      return result;
    },
    ["page-content"],
    { revalidate: 3600, tags: ["content"] }
  );

  static getContent = cache(async (page: string, lang: string) => {
    return this.fetchContentCached(page, lang);
  });

  static async updateContent(page: string, lang: string, sections: any) {
    const prisma = (await import("@/lib/prisma")).default;
    const redis = (await import("@/lib/redis")).default;

    const content = await prisma.pageContent.upsert({
      where: {
        page_lang: {
          page,
          lang,
        },
      },
      update: {
        sections,
      },
      create: {
        page,
        lang,
        sections,
      },
    });

    // Invalidate Cache
    if (redis) {
      const cacheKey = this.getCacheKey(page, lang);
      await redis.del(cacheKey).catch(() => {});
    }
    revalidateTag("content", "max");

    return content;
  }
}
