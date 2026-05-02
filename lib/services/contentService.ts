import prisma from "@/lib/prisma";
import redis from "@/lib/redis";

export class ContentService {
  private static CACHE_TTL = 3600; // 1 hour

  private static getCacheKey(page: string, lang: string) {
    return `page:${page}:${lang}`;
  }

  static async getContent(page: string, lang: string) {
    const cacheKey = this.getCacheKey(page, lang);

    // 1. Try Redis
    if (redis) {
      try {
        const cached = await redis.get(cacheKey);
        if (cached) {
          console.log(`[ContentService] Cache hit for ${cacheKey}`);
          return typeof cached === 'string' ? JSON.parse(cached) : cached;
        }
      } catch (error: any) {
        if (error.message?.includes('Dynamic server usage')) {
          console.log("[ContentService] Redis skipped during build");
        } else {
          console.error("[ContentService] Redis error:", error);
        }
      }
    }

    // 2. Fallback to Prisma
    console.log(`[ContentService] Cache miss for ${cacheKey}. Fetching from DB.`);
    const content = await prisma.pageContent.findUnique({
      where: {
        page_lang: {
          page,
          lang,
        },
      },
    });

    if (!content) {
      console.log(`[ContentService] DB miss for ${cacheKey}. Auto-seeding from local JSON...`);
      const contentData = require("@/data/content.json");
      const fallbackSections = contentData.content[lang]?.[page] || contentData.content.en?.[page];
      
      if (!fallbackSections) return null;

      // Seed the database and cache implicitly using the established method
      const newContent = await this.updateContent(page, lang, fallbackSections);
      
      return {
        _id: newContent.id,
        page: newContent.page,
        lang: newContent.lang,
        sections: newContent.sections,
      };
    }

    const result = {
      _id: content.id,
      page: content.page,
      lang: content.lang,
      sections: content.sections,
    };

    // 3. Set Redis
    if (redis) {
      try {
        await redis.set(cacheKey, JSON.stringify(result), { ex: this.CACHE_TTL });
      } catch (error: any) {
        if (error.message?.includes('Dynamic server usage')) {
          // Ignore
        } else {
          console.error("[ContentService] Redis set error:", error);
        }
      }
    }

    return result;
  }

  static async updateContent(page: string, lang: string, sections: any) {
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
      await redis.del(cacheKey);
    }

    return content;
  }
}
