import { instance } from './instance';
import { getCacheData, setCacheData } from '../utils/cacheStorage';

export const getSicks = async (keyword: string) => {
  const cachedResult = await getCacheData('/sick', keyword);
  if (cachedResult) {
    return await cachedResult.json();
  } else {
    console.info('Calling API');
    const { data } = await instance.get(`/sick?q=${keyword}`);
    setCacheData('/sick', keyword, data);
    return data;
  }
};
