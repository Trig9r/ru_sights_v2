import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useSightTypes = <T>(
  type: string,
  category: string | null | number,
  sortByASC: boolean,
) => {
  return useQuery({
    queryKey: [`sightType=${type}&sortCategory=${category}&sort=${sortByASC ? 'ASC' : 'DESC'}`],
    queryFn: async () => {
      const { data } = await axios.get<T[]>(
        `https://https-requests-script.smirnovkiryusha12.workers.dev/sight_api/sights/type.php?type=${type}&order=${category}&sort=${
          sortByASC ? 'ASC' : 'DESC'
        }`,
      );
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });
};
