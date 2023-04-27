import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useSightTypes = <T>(type: string) => {
  return useQuery({
    queryKey: ['sightType'],
    queryFn: async () => {
      const { data } = await axios.get<T[]>(
        `http://localhost/sight_api/sights/type.php?type=${type}`,
      );
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
