import { useState, useEffect } from 'react';
import { getSicks } from '../apis/apis';
import useDebounce from './useDebounce';

interface FetchProps {
  isFocus: boolean;
  value: string;
}

const useFetch = ({ isFocus, value }: FetchProps) => {
  const [data, setData] = useState([]);
  const debounceValue = useDebounce(value, 300);

  useEffect(() => {
    const fetchData = async () => {
      if (isFocus && debounceValue) {
        const currentTime = new Date().getTime();
        const cacheTime = 1000 * 60;

        const cachedData = sessionStorage.getItem(debounceValue);

        if (!cachedData || currentTime - JSON.parse(cachedData).cachedTime > cacheTime) {
          try {
            const response = await getSicks(debounceValue);
            setData(response.data);

            const cacheData = {
              data: response.data,
              cachedTime: currentTime,
            };
            sessionStorage.setItem(debounceValue, JSON.stringify(cacheData));
          } catch (error) {
            console.error(error);
          }
        } else {
          setData(JSON.parse(cachedData).data);
        }
      }
    };

    fetchData();
  }, [isFocus, debounceValue]);

  return data;
};

export default useFetch;
