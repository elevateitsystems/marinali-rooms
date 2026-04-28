import prisma from "@/lib/prisma";
import redis from "@/lib/redis";

export class RoomService {
  private static CACHE_TTL = 3600; // 1 hour
  private static CACHE_KEY = "rooms:all";

  static async getRooms() {
    // 1. Try Redis
    if (redis) {
      try {
        const cached = await redis.get(this.CACHE_KEY);
        if (cached) {
          console.log(`[RoomService] Cache hit for ${this.CACHE_KEY}`);
          return typeof cached === 'string' ? JSON.parse(cached) : cached;
        }
      } catch (error) {
        console.error("[RoomService] Redis error:", error);
      }
    }

    // 2. Fetch from DB
    const rooms = await prisma.room.findMany({
      orderBy: { order: 'asc' },
    });

    // 3. Set Redis
    if (redis && rooms.length > 0) {
      try {
        await redis.set(this.CACHE_KEY, JSON.stringify(rooms), { ex: this.CACHE_TTL });
      } catch (error) {
        console.error("[RoomService] Redis set error:", error);
      }
    }

    return rooms;
  }

  static async updateRoom(id: string, data: any) {
    const room = await prisma.room.update({
      where: { id },
      data: {
        image: data.image,
        imageKey: data.imageKey,
        images: data.images,
        translations: data.translations,
        order: data.order,
      },
    });

    // Invalidate Cache
    if (redis) {
      await redis.del(this.CACHE_KEY);
    }

    return room;
  }

  static async createRoom(data: any) {
    const room = await prisma.room.create({
      data: {
        slug: data.slug,
        image: data.image,
        imageKey: data.imageKey,
        images: data.images,
        translations: data.translations,
        order: data.order || 0,
      },
    });

    // Invalidate Cache
    if (redis) {
      await redis.del(this.CACHE_KEY);
    }

    return room;
  }

  static async deleteRoom(id: string) {
    await prisma.room.delete({
      where: { id },
    });

    // Invalidate Cache
    if (redis) {
      await redis.del(this.CACHE_KEY);
    }
  }
}
