'use client'

import { useCharacters } from '@/hooks/useCharacters'
import Image from 'next/image'

export default function Home() {
  const { data, isLoading, error } = useCharacters()

  if (isLoading) return <p className="mt-10 text-center">Carregando...</p>
  if (error)
    return (
      <p className="mt-10 text-center text-red-500">
        Erro ao buscar personagens
      </p>
    )

  return (
    <main className="mx-auto grid max-w-5xl grid-cols-2 gap-6 p-4 md:grid-cols-3">
      {data?.map(char => (
        <div
          key={char.id}
          className="rounded-2xl bg-white p-4 text-center shadow-md"
        >
          <Image
            src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
            alt={char.name}
            width={200}
            height={200}
            className="mx-auto rounded"
          />
          <h2 className="mt-2 text-lg font-bold">{char.name}</h2>
          <p className="text-sm text-gray-500">
            {char.description || 'Sem descrição disponível.'}
          </p>
        </div>
      ))}
    </main>
  )
}
