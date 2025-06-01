import { api } from '@/lib/api'
import type { MarvelCharacter } from '@/types/marvel-response'
import { useInfiniteQuery } from '@tanstack/react-query'

export function useAllCharacters() {
  return useInfiniteQuery<MarvelCharacter[]>({
    queryKey: ['all-characters'],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.get('/characters', {
        params: {
          limit: 100,
          offset: pageParam,
        },
      })
      return res.data
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextOffset = allPages.length * 100
      return lastPage.length < 100 ? undefined : nextOffset
    },
  })
}
