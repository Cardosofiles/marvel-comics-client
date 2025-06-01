
import { api } from '@/lib/api';
import { charactersResponseSchema } from '@/types/characters-schema';
import { useQuery } from '@tanstack/react-query';

export const useCharacters = () => {
  return useQuery({
    queryKey: ['characters'],
    queryFn: async () => {
      const res = await api.get('/characters');
      const parsed = charactersResponseSchema.parse(res.data);
      return parsed.data.results;
    },
  });
};
