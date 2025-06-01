'use client'

import { CharacterCard } from '@/components/CharacterCard'
import { useInfiniteCharacters } from '@/hooks/useInfiniteCharacters'
import { useEffect, useRef } from 'react'

export default function CharactersPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteCharacters()

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    observer.observe(loadMoreRef.current)

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current)
    }
  }, [hasNextPage, fetchNextPage])

  if (isLoading) return <p className="p-4 text-center">Carregando...</p>
  if (error)
    return (
      <p className="p-4 text-center text-red-500">
        Erro ao carregar personagens
      </p>
    )

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {data?.pages
          .flat()
          .map(char => <CharacterCard key={char.id} character={char} />)}
      </div>

      <div ref={loadMoreRef} className="mt-8 h-10 text-center">
        {isFetchingNextPage && <p>Carregando mais...</p>}
      </div>
    </main>
  )
}
