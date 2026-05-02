import { cache } from "react";
import { unstable_cache, revalidateTag } from "next/cache";

export class RoomService {
  private static CACHE_TTL = 60; // 60 seconds
  private static CACHE_KEY = "rooms:all";

  /**
   * High-Performance fetching: Redis -> DB fallback
   * Wrapped in Next.js Data Cache (unstable_cache) for ISR/SSG support
   */
  private static fetchRoomsCached = unstable_cache(
    async () => {
      const redis = (await import("@/lib/redis")).default;

      // 1. Try Redis
      if (redis) {
        try {
          const cached = await redis.get(this.CACHE_KEY);
          if (cached) {
            console.log(`[RoomService] Redis hit for ${this.CACHE_KEY}`);
            return typeof cached === 'string' ? JSON.parse(cached) : cached;
          }
        } catch (error: any) {
          if (!error.message?.includes('Dynamic server usage')) {
            console.error("[RoomService] Redis error:", error);
          }
        }
      }

      // 2. Fallback to DB
      console.log("[RoomService] Cache miss. Fetching DB for rooms.");
      const prisma = (await import("@/lib/prisma")).default;
      const rooms = await prisma.room.findMany({
        orderBy: { order: 'asc' },
      });

      // 3. Backfill Redis
      if (rooms && rooms.length > 0 && redis) {
        redis.set(this.CACHE_KEY, JSON.stringify(rooms), { ex: 3600 }).catch(() => {});
      }

      return rooms;
    },
    ["rooms-list"],
    { revalidate: 3600, tags: ["rooms"] }
  );

  static getRooms = cache(async () => {
    return this.fetchRoomsCached();
  });

  static async updateRoom(id: string, data: any) {
    const prisma = (await import("@/lib/prisma")).default;
    const redis = (await import("@/lib/redis")).default;

    const current = await prisma.room.findUnique({ where: { id } });

    // Clean up old gallery images if they were replaced or removed
    if (current?.images && Array.isArray(current.images)) {
      const currentKeys = current.images.map((img: any) => img.key).filter(Boolean);
      const newKeys = Array.isArray(data.images) ? data.images.map((img: any) => img.key).filter(Boolean) : [];
      
      const keysToDelete = currentKeys.filter((key: string) => !newKeys.includes(key));
      
      if (keysToDelete.length > 0) {
        try {
          const { UTApi } = await import("uploadthing/server");
          const utapi = new UTApi();
          await utapi.deleteFiles(keysToDelete);
          console.log(`[RoomService] Old gallery images deleted:`, keysToDelete);
        } catch (error) {
          console.error(`[RoomService] Failed to delete old gallery images:`, error);
        }
      }
    }

    // Validation: Prevent saving blob URLs
    if (Array.isArray(data.images)) {
      const hasBlob = data.images.some((img: any) => {
        const url = typeof img === 'string' ? img : img.url;
        return url && url.startsWith('blob:');
      });
      if (hasBlob) {
        throw new Error("Cannot save temporary blob URLs in gallery");
      }
    }

    const room = await prisma.room.update({
      where: { id },
      data: {
        images: data.images,
        translations: data.translations,
        order: data.order,
      },
    });

    // Invalidate caches
    if (redis) {
      await redis.del(this.CACHE_KEY).catch(() => {});
    }
    revalidateTag("rooms", "max");

    return room;
  }

  static async createRoom(data: any) {
    const prisma = (await import("@/lib/prisma")).default;
    const redis = (await import("@/lib/redis")).default;

    const room = await prisma.room.create({
      data: {
        slug: data.slug,
        images: data.images,
        translations: data.translations,
        order: data.order || 0,
      },
    });

    // Invalidate caches
    if (redis) {
      await redis.del(this.CACHE_KEY).catch(() => {});
    }
    revalidateTag("rooms", "max");

    return room;
  }

  static async deleteRoom(id: string) {
    const prisma = (await import("@/lib/prisma")).default;
    const redis = (await import("@/lib/redis")).default;

    const current = await prisma.room.findUnique({ where: { id } });

    // Handle array of images if they exist
    if (current?.images) {
      try {
        const images = current.images as any[];
        const keys = images.map(img => img.key).filter(Boolean);
        if (keys.length > 0) {
          const { UTApi } = await import("uploadthing/server");
          const utapi = new UTApi();
          await utapi.deleteFiles(keys);
          console.log(`[RoomService] Room gallery images deleted:`, keys);
        }
      } catch (error) {
        console.error(`[RoomService] Failed to delete gallery images:`, error);
      }
    }

    await prisma.room.delete({
      where: { id },
    });

    // Invalidate caches
    if (redis) {
      await redis.del(this.CACHE_KEY).catch(() => {});
    }
    revalidateTag("rooms", "max");
  }
}
