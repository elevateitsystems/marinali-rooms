import { getDefaultSettings } from "@/lib/content";
import { cache } from "react";
import { unstable_cache, revalidateTag } from "next/cache";

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  url: string;
}

export interface FooterConfig {
  infoTitle?: string;
  columns: FooterColumn[];
  socialLinks: FooterSocialLink[];
  copyright: string;
  bottomLinks: FooterLink[];
  mapUrl?: string;
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  logo?: string | null;
  logoKey?: string | null;
  heroImage?: string | null;
  heroImageKey?: string | null;
  retreatImage?: string | null;
  retreatImageKey?: string | null;
  footerConfig?: Record<string, FooterConfig> | null;
}

export class SettingsService {
  private static CACHE_KEY = "site:settings";
  private static CACHE_TTL = 60; // 60 seconds

  /**
   * Internal DB fetch wrapped in Next.js unstable_cache
   */
  private static fetchFromDbCached = unstable_cache(
    async () => {
      console.log(
        "[SettingsService] Cache miss (Redis & Next.js). Fetching from DB.",
      );
      const prisma = (await import("@/lib/prisma")).default;
      const dbSettings = await prisma.siteSettings.findUnique({
        where: { id: "default" },
      });

      if (!dbSettings) return null;

      return {
        primaryColor: dbSettings.primaryColor,
        secondaryColor: dbSettings.secondaryColor,
        backgroundColor: dbSettings.backgroundColor,
        textColor: dbSettings.textColor,
        fontFamily: dbSettings.fontFamily,
        logo: dbSettings.logo,
        logoKey: dbSettings.logoKey,
        heroImage: dbSettings.heroImage,
        heroImageKey: dbSettings.heroImageKey,
        retreatImage: dbSettings.retreatImage,
        retreatImageKey: dbSettings.retreatImageKey,
        footerConfig: dbSettings.footerConfig as Record<
          string,
          FooterConfig
        > | null,
      };
    },
    ["site-settings"],
    { revalidate: 60, tags: ["settings"] },
  );

  /**
   * Get site theme settings.
   * Pattern: Build Bypass -> Redis -> unstable_cache -> DB
   */
  static getSettings = cache(async (): Promise<ThemeSettings> => {
    // 5. Disable during build phase
    if (process.env.IS_BUILD === "true") {
      return getDefaultSettings();
    }

    const redis = (await import("@/lib/redis")).default;

    // 1. Try Redis with a strict timeout (Circuit Breaker)
    if (redis) {
      try {
        const timeout = new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error("Redis timeout")), 1500)
        );
        const cached = await (Promise.race([
          redis.get<ThemeSettings>(this.CACHE_KEY),
          timeout,
        ]) as Promise<ThemeSettings | null>);

        if (cached) {
          console.log("[SettingsService] Redis hit");
          return cached;
        }
      } catch (error: any) {
        console.warn("[SettingsService] Redis skipped:", error.message);
      }
    }

    // 4. Wrap with Next.js unstable_cache (Step 2 & 3 are inside fetchFromDbCached)
    try {
      const settings = await this.fetchFromDbCached();

      if (settings) {
        // 3. Cache result in Redis (async)
        if (redis) {
          redis
            .set(this.CACHE_KEY, JSON.stringify(settings), {
              ex: this.CACHE_TTL,
            })
            .catch(() => {});
        }
        return settings;
      }
    } catch (error) {
      console.error("[SettingsService] Cache layer error:", error);
    }

    return getDefaultSettings();
  });

  /**
   * Update site theme settings.
   */
  static async updateSettings(
    data: Partial<ThemeSettings>,
  ): Promise<ThemeSettings> {
    const defaults = getDefaultSettings();
    const current = await this.getSettings();
    const prisma = (await import("@/lib/prisma")).default;
    const redis = (await import("@/lib/redis")).default;

    // Handle old image cleanup if logoKey is changing
    const imageFieldsToCleanup = [
      { key: "logoKey" as const, currentKey: current.logoKey },
      { key: "heroImageKey" as const, currentKey: current.heroImageKey },
      { key: "retreatImageKey" as const, currentKey: current.retreatImageKey },
    ];

    for (const field of imageFieldsToCleanup) {
      if (
        data[field.key] !== undefined &&
        field.currentKey &&
        field.currentKey !== data[field.key]
      ) {
        try {
          const { UTApi } = await import("uploadthing/server");
          const utapi = new UTApi();
          await utapi.deleteFiles(field.currentKey);
          console.log(
            `[SettingsService] Old ${field.key} deleted:`,
            field.currentKey,
          );
        } catch (error) {
          console.error(
            `[SettingsService] Failed to delete old ${field.key}:`,
            error,
          );
        }
      }
    }

    const merged: Record<string, unknown> = {
      primaryColor:
        data.primaryColor ?? current.primaryColor ?? defaults.primaryColor,
      secondaryColor:
        data.secondaryColor ??
        current.secondaryColor ??
        defaults.secondaryColor,
      backgroundColor:
        data.backgroundColor ??
        current.backgroundColor ??
        defaults.backgroundColor,
      textColor: data.textColor ?? current.textColor ?? defaults.textColor,
      fontFamily: data.fontFamily ?? current.fontFamily ?? defaults.fontFamily,
      logo: data.logo !== undefined ? data.logo : current.logo,
      logoKey: data.logoKey !== undefined ? data.logoKey : current.logoKey,
      heroImage:
        data.heroImage !== undefined ? data.heroImage : current.heroImage,
      heroImageKey:
        data.heroImageKey !== undefined
          ? data.heroImageKey
          : current.heroImageKey,
      retreatImage:
        data.retreatImage !== undefined
          ? data.retreatImage
          : current.retreatImage,
      retreatImageKey:
        data.retreatImageKey !== undefined
          ? data.retreatImageKey
          : current.retreatImageKey,
      footerConfig:
        data.footerConfig !== undefined
          ? data.footerConfig
          : current.footerConfig,
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
      logo: updated.logo,
      logoKey: updated.logoKey,
      heroImage: updated.heroImage,
      heroImageKey: updated.heroImageKey,
      retreatImage: updated.retreatImage,
      retreatImageKey: updated.retreatImageKey,
      footerConfig: updated.footerConfig as Record<string, FooterConfig> | null,
    };

    // Invalidate caches
    if (redis) {
      await redis.del(this.CACHE_KEY).catch(() => {});
    }
    revalidateTag("settings");
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");

    return settings;
  }
}
