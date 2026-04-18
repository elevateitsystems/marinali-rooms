import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { getDefaultSettings } from "@/lib/content";

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
}

export class SettingsService {
  private static CACHE_KEY = "site:settings";
  private static CACHE_TTL = 3600; // 1 hour

  /**
   * Get site theme settings.
   * Priority: Redis cache → PostgreSQL → content.json defaults
   */
  static async getSettings(): Promise<ThemeSettings> {
    // 1. Try Redis cache
    if (redis) {
      try {
        const cached = await redis.get<ThemeSettings>(this.CACHE_KEY);
        if (cached) {
          console.log("[SettingsService] Cache hit");
          return cached;
        }
      } catch (error) {
        console.error("[SettingsService] Redis read error:", error);
      }
    }

    // 2. Try PostgreSQL
    try {
      console.log("[SettingsService] Cache miss. Fetching from DB.");
      const dbSettings = await prisma.siteSettings.findUnique({
        where: { id: "default" },
      });

      if (dbSettings) {
        const settings: ThemeSettings = {
          primaryColor: dbSettings.primaryColor,
          secondaryColor: dbSettings.secondaryColor,
          backgroundColor: dbSettings.backgroundColor,
          textColor: dbSettings.textColor,
          fontFamily: dbSettings.fontFamily,
        };

        // Cache in Redis
        if (redis) {
          try {
            await redis.set(this.CACHE_KEY, JSON.stringify(settings), { ex: this.CACHE_TTL });
          } catch (error) {
            console.error("[SettingsService] Redis set error:", error);
          }
        }

        return settings;
      }
    } catch (error) {
      console.error("[SettingsService] DB error:", error);
    }

    // 3. Fallback to content.json defaults
    console.log("[SettingsService] Using content.json defaults.");
    return getDefaultSettings();
  }

  /**
   * Update site theme settings.
   * Upserts to DB and invalidates Redis cache.
   */
  static async updateSettings(data: Partial<ThemeSettings>): Promise<ThemeSettings> {
    const defaults = getDefaultSettings();

    const merged = {
      primaryColor: data.primaryColor ?? defaults.primaryColor,
      secondaryColor: data.secondaryColor ?? defaults.secondaryColor,
      backgroundColor: data.backgroundColor ?? defaults.backgroundColor,
      textColor: data.textColor ?? defaults.textColor,
      fontFamily: data.fontFamily ?? defaults.fontFamily,
    };

    const updated = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: merged,
      create: {
        id: "default",
        ...merged,
      },
    });

    const settings: ThemeSettings = {
      primaryColor: updated.primaryColor,
      secondaryColor: updated.secondaryColor,
      backgroundColor: updated.backgroundColor,
      textColor: updated.textColor,
      fontFamily: updated.fontFamily,
    };

    // Invalidate Redis cache
    if (redis) {
      try {
        await redis.del(this.CACHE_KEY);
        console.log("[SettingsService] Cache invalidated.");
      } catch (error) {
        console.error("[SettingsService] Redis del error:", error);
      }
    }

    return settings;
  }
}
