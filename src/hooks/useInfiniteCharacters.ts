import { api } from '@/lib/api'
import { useInfiniteQuery } from '@tanstack/react-query'

export type Character = {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export function useInfiniteCharacters() {
  return useInfiniteQuery<Character[]>({
    queryKey: ['characters'],
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
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < 100 ? undefined : pages.length * 100,
  })
}
