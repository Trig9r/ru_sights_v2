import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useSightCity = <T>(city: string) => {
  return useQuery({
    queryKey: ['sightCity'],
    queryFn: async () => {
      const { data } = await axios.get<T>(
        `http://localhost/sight_api/sights/city.php?city=${city}`,
      );
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
