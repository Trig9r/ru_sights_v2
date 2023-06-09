import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useSightCity = <T>(
  city: string,
  type: string | null | number,
  category: string | null | number,
  sortByASC: boolean,
) => {
  return useQuery({
    queryKey: [
      `sightCity=${city}&sightType=${type}&sortCategory=${category}&sort=${
        sortByASC ? 'ASC' : 'DESC'
      }`,
    ],
    queryFn: async () => {
      const { data } = await axios.get<T>(
        `https://https-requests-script.smirnovkiryusha12.workers.dev/sight_api/sights/city.php?city=${city}&type=${type}&order=${category}&sort=${
          sortByASC ? 'ASC' : 'DESC'
        }`,
      );
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });
};
