import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useSight = <T>(name: string) => {
  return useQuery({
    queryKey: ['sight', name],
    queryFn: async () => {
      const { data } = await axios.get<T>(
        `https://https-requests-script.smirnovkiryusha12.workers.dev/sight_api/sights/read_one.php?name=${name}`,
      );
      return data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
