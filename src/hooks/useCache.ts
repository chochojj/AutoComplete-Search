import { useEffect, useState } from 'react';

// 캐시 만료 시간 (분)
const EXPIRE_MINUTES = 5;

interface CachedData<T> {
  data: T;
  expireTime: number;
}

const cacheData = <T>(key: string, data: T) => {
  const currentTime = new Date().getTime();
  const expireTime = currentTime + EXPIRE_MINUTES * 60 * 1000;
  const cachedData: CachedData<T> = {
    data,
    expireTime,
  };
  localStorage.setItem(key, JSON.stringify(cachedData));
};

const getCachedData = <T>(key: string): T | null => {
  const cachedData = localStorage.getItem(key);
  if (!cachedData) return null;

  const parsedData: CachedData<T> = JSON.parse(cachedData);
  const currentTime = new Date().getTime();

  if (currentTime < parsedData.expireTime) {
    return parsedData.data;
  } else {
    localStorage.removeItem(key);
    return null;
  }
};

const useCache = <T>(key: string, fetchData: () => Promise<T>): T | null => {
  const [data, setData] = useState<T | null>(getCachedData<T>(key));

  useEffect(() => {
    const fetchDataAndCache = async () => {
      const newData = await fetchData();

      // 새로운 데이터 캐싱
      cacheData(key, newData);
      setData(newData);
    };

    if (!data) {
      fetchDataAndCache();
    }
  }, [data, key, fetchData]);

  return data;
};

export default useCache;
