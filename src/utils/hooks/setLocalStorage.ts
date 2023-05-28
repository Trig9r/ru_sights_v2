import type { SightCardTypes } from '@/store';

export const setLocalStorage = (key: string, data: SightCardTypes[] | number[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};
