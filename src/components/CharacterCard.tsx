import { Character } from '@/hooks/useInfiniteCharacters'

export function CharacterCard({ character }: { character: Character }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        width={300}
        height={300}
        className="h-[300px] w-full rounded object-cover"
      />
      <h2 className="mt-2 text-lg font-bold">{character.name}</h2>
      <p className="mt-1 line-clamp-3 text-sm text-gray-600">
        {character.description || 'Sem descrição'}
      </p>
    </div>
  )
}
