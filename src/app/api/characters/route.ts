import { createHash } from 'crypto'
import { NextResponse } from 'next/server'

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY!
const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY!

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') || '100'
  const offset = searchParams.get('offset') || '0'

  const ts = Date.now().toString()
  const hash = createHash('md5')
    .update(ts + PRIVATE_KEY + PUBLIC_KEY)
    .digest('hex')

  const url = new URL('https://gateway.marvel.com/v1/public/characters')
  url.searchParams.set('ts', ts)
  url.searchParams.set('apikey', PUBLIC_KEY)
  url.searchParams.set('hash', hash)
  url.searchParams.set('limit', limit)
  url.searchParams.set('offset', offset)

  try {
    const res = await fetch(url.toString())
    const data = await res.json()
    return NextResponse.json(data.data.results)
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
