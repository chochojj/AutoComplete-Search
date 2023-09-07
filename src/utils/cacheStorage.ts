import { Sick } from '../types/types';

const EXPIRE_MINUTE = 5;

export const setCacheData = async (url: string, keyword: string, data: Sick[]) => {
  const cacheStorage = await caches.open(url);
  const expireAt = new Date();
  expireAt.setMinutes(expireAt.getMinutes() + EXPIRE_MINUTE);
  const headerOption = {
    headers: {
      'Cache-Control': `max-age=${EXPIRE_MINUTE * 60}`,
    },
  };
  const cacheResponse = new Response(JSON.stringify(data), headerOption);
  cacheStorage.put(keyword, cacheResponse);
};

export const getCacheData = async (url: string, keyword: string) => {
  const cacheStorage = await caches.open(url);
  const cachedResponse = await cacheStorage.match(keyword);

  if (!cachedResponse) return null;

  const expireHeader = cachedResponse.headers.get('Expires');
  if (!expireHeader) return null;

  const ExpireTime = new Date(expireHeader);
  const isExpired = new Date() > ExpireTime;
  if (isExpired) return null;

  return cachedResponse;
};
