import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCity = <T>(city: string) => {
  return useQuery({
    queryKey: ['city', city],
    queryFn: async () => {
      const { data } = await axios.get<T>(
        `http://localhost/sight_api/cities/read_one.php?city=${city}`,
      );
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });
};
