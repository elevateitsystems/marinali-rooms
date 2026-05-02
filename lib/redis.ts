import { Redis } from "@upstash/redis";

const redisClientSingleton = () => {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn("UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is not defined. Redis caching will be disabled.");
    return null;
  }

  return new Redis({ 
    url, 
    token,
    // Fix: Prevent Redis from forcing dynamic rendering using a custom fetch wrapper.
    // This ensures Next.js caches the request while bypassing strict type checks.
    fetch: (input: RequestInfo | URL, init?: RequestInit) => 
      fetch(input, { ...init, next: { revalidate: 3600 } } as RequestInit)
  } as any);
};

type RedisClientSingleton = ReturnType<typeof redisClientSingleton>;

const globalForRedis = globalThis as unknown as {
  redis: RedisClientSingleton | undefined;
};

const redis = globalForRedis.redis ?? redisClientSingleton();

export default redis;

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
