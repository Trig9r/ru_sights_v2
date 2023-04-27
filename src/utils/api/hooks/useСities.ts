import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCities = <T>() => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data } = await axios.get<T>('http://localhost/sight_api/cities/read.php');
      return data;
    },
    refetchOnWindowFocus: false,
  });
};
