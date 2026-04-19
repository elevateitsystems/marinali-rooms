import prisma from "@/lib/prisma";
import redis from "@/lib/redis";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// Unified Room Data for creation/updates
export interface RoomData {
  id?: string;
  image: string;
  imageKey?: string | null;
  location: string;
  order?: number;
  isOffer?: boolean;
  isHighlight?: boolean;
  isLargeHighlight?: boolean;
  nameEn: string;
  nameIt: string;
  nameDe: string;
  descriptionEn: string;
  descriptionIt: string;
  descriptionDe: string;
}

// Flattened Room Data for frontend consumption
export interface FlattenedRoom {
  id: string;
  image: string;
  imageKey?: string | null;
  location: string;
  order: number;
  isOffer: boolean;
  isHighlight: boolean;
  isLargeHighlight: boolean;
  name: string;
  description: string;
  updatedAt: Date;
  createdAt: Date;
}

export class RoomService {
  private static CACHE_TTL = 3600; // 1 hour

  private static getCacheKey(lang: string, isOffer?: boolean, isHighlight?: boolean) {
    let suffix = "";
    if (isOffer !== undefined) suffix += `:offer:${isOffer}`;
    if (isHighlight !== undefined) suffix += `:highlight:${isHighlight}`;
    return `rooms:unified:${lang}${suffix}`;
  }

  /**
   * Fetches rooms and flattens them for the requested language
   */
  static async getRooms(lang: string, isOffer?: boolean, isHighlight?: boolean): Promise<FlattenedRoom[]> {
    const cacheKey = this.getCacheKey(lang, isOffer, isHighlight);

    // 1. Try Redis
    if (redis) {
      try {
        const cached = await redis.get(cacheKey);
        if (cached) {
          console.log(`[RoomService] Cache hit for ${cacheKey}`);
          return (typeof cached === 'string' ? JSON.parse(cached) : cached) as FlattenedRoom[];
        }
      } catch (error) {
        console.error("[RoomService] Redis error:", error);
      }
    }

    // 2. Fallback to Prisma
    console.log(`[RoomService] Cache miss for ${cacheKey}. Fetching rooms from DB.`);
    const where: any = {};
    if (isOffer !== undefined) where.isOffer = isOffer;
    if (isHighlight !== undefined) where.isHighlight = isHighlight;

    const rooms = await prisma.room.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    // 3. Flatten the data for the requested language
    const flattenedRooms: FlattenedRoom[] = rooms.map(room => ({
      id: room.id,
      image: room.image,
      imageKey: room.imageKey,
      location: room.location,
      order: room.order,
      isOffer: room.isOffer,
      isHighlight: room.isHighlight,
      isLargeHighlight: room.isLargeHighlight,
      name: lang === 'it' ? room.nameIt : lang === 'de' ? room.nameDe : room.nameEn,
      description: lang === 'it' ? room.descriptionIt : lang === 'de' ? room.descriptionDe : room.descriptionEn,
      updatedAt: room.updatedAt,
      createdAt: room.createdAt,
    }));

    // 4. Set Redis
    if (redis && flattenedRooms.length > 0) {
      try {
        await redis.set(cacheKey, JSON.stringify(flattenedRooms), { ex: this.CACHE_TTL });
      } catch (error) {
        console.error("[RoomService] Redis set error:", error);
      }
    }

    return flattenedRooms;
  }

  static async getAllRooms() {
    return await prisma.room.findMany({
      orderBy: { order: 'asc' }
    });
  }

  static async getRoomById(id: string) {
    return await prisma.room.findUnique({
      where: { id },
    });
  }

  static async createRoom(data: RoomData) {
    try {
      const room = await prisma.$transaction(async (tx) => {
        if (data.isLargeHighlight) {
          await tx.room.updateMany({
            where: { isLargeHighlight: true },
            data: { isLargeHighlight: false },
          });
        }
        return await tx.room.create({ data });
      });

      // Invalidate all language caches
      await this.invalidateAllCaches();

      return room;
    } catch (error) {
      console.error("[RoomService] Error creating room:", error);
      throw error;
    }
  }

  static async updateRoom(id: string, data: Partial<RoomData>) {
    // Cleanup old image if changed
    if (data.imageKey) {
      const oldRoom = await prisma.room.findUnique({ where: { id }, select: { imageKey: true } });
      if (oldRoom?.imageKey && oldRoom.imageKey !== data.imageKey) {
        try {
          await utapi.deleteFiles(oldRoom.imageKey);
        } catch (error) {
          console.error("[RoomService] Failed to delete old image:", error);
        }
      }
    }

    const room = await prisma.$transaction(async (tx) => {
      if (data.isLargeHighlight) {
        await tx.room.updateMany({
          where: { id: { not: id }, isLargeHighlight: true },
          data: { isLargeHighlight: false },
        });
      }
      return await tx.room.update({
        where: { id },
        data,
      });
    });

    await this.invalidateAllCaches();

    return room;
  }

  static async deleteRoom(id: string) {
    const roomToDelete = await prisma.room.findUnique({ where: { id }, select: { imageKey: true } });
    
    const room = await prisma.room.delete({
      where: { id },
    });

    if (roomToDelete?.imageKey) {
      try {
        await utapi.deleteFiles(roomToDelete.imageKey);
      } catch (error) {
        console.error("[RoomService] Failed to delete image:", error);
      }
    }

    await this.invalidateAllCaches();

    return room;
  }

  private static async invalidateAllCaches() {
    if (redis) {
      try {
        // Pattern match to delete all room-related keys
        const keys = await redis.keys("rooms:unified:*");
        if (keys.length > 0) {
          await redis.del(...keys);
        }
      } catch (error) {
        console.error("[RoomService] Redis cache invalidation error:", error);
      }
    }
  }
}
