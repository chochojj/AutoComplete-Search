import { instance } from './instance';

export const getSicks = async (value: string) => {
  const { data } = await instance.get('/sick', {
    params: {
      q: value,
    },
  });

  return { data };
};
