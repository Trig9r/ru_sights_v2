import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const usePurify = <T>(name: string | undefined, desc: string | undefined) => {
  return useQuery({
    queryKey: [`purifyCheck&name=${name}&desc=${desc}`],
    queryFn: async () => {
      const { data } = await axios.get<T>(
        `https://https-requests-script.smirnovkiryusha12.workers.dev/sight_api/purify/check_purify.php?name=${name}&desc=${desc}`,
      );
      return data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
