import { Sick } from '../types/types';
import { instance } from './instance';

export const getSearchResult = (keyword: string) => {
  console.info('calling api');
  return instance.get<Sick[]>('/sick', { params: { q: keyword } });
};
