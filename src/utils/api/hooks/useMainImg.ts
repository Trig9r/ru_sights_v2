import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useMainImg = <T>() => {
  return useQuery({
    queryKey: ['mainImg'],
    queryFn: async () => {
      const { data } = await axios.get<T>(
        `https://https-requests-script.smirnovkiryusha12.workers.dev/sight_api/images/read_one_main_img.php`,
      );
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
