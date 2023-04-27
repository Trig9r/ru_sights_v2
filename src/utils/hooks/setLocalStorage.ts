import type { SightCardTypes } from '@/store';

export const setLocalStorage = (key: string, data: SightCardTypes[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};
