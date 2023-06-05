import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useSightTypes = <T>(type: string, category: string, sortByASC: boolean) => {
  return useQuery({
    queryKey: [`sightType=${type}&sortCategory=${category}&sort=${sortByASC ? 'ASC' : 'DESC'}`],
    queryFn: async () => {
      const { data } = await axios.get<T[]>(
        `http://srv191964.hoster-test.ru/sight_api/sights/type.php?type=${type}&order=${category}&sort=${
          sortByASC ? 'ASC' : 'DESC'
        }`,
      );
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });
};
