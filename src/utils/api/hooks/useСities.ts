import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCities = <T>(category: string, sortByASC: boolean) => {
  return useQuery({
    queryKey: [`cities&categorySort=${category}&sort=${sortByASC ? 'ASC' : 'DESC'}`],
    queryFn: async () => {
      const { data } = await axios.get<T>(
        `http://localhost/sight_api/cities/read.php?order=${category}&sort=${
          sortByASC ? 'ASC' : 'DESC'
        }`,
      );
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });
};
