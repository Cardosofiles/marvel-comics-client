export type MarvelCharacter = {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  urls: {
    type: string
    url: string
  }[]
}
