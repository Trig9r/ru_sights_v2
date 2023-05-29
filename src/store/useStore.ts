import { create } from 'zustand';

import { setLocalStorage, getLocalStorage } from '@/utils/hooks';

export interface SightCardTypes {
  id: number;
  name: string;
  count_views: number;
  likes: number;
  imgUrl: string;
}

interface SightState {
  favoriteSights: SightCardTypes[];
  addSight: (sight: SightCardTypes) => void;
  removeSight: (id: number) => void;
}

export const useStore = create<SightState>((set) => ({
  // initial state
  favoriteSights: getLocalStorage('store'),
  // methods for manipulating state
  addSight: (sight: SightCardTypes) => {
    set((state) => ({
      favoriteSights: [
        {
          id: sight.id,
          name: sight.name,
          count_views: sight.count_views,
          likes: sight.likes,
          imgUrl: sight.imgUrl,
        } as SightCardTypes,
        ...state.favoriteSights,
      ],
    }));
  },
  removeSight: (id) => {
    set((state) => ({
      favoriteSights: state.favoriteSights.filter((sight) => sight.id !== id),
    }));
  },
}));

useStore.subscribe(() => {
  setLocalStorage('store', useStore.getState().favoriteSights);
});
