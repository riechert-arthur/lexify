import { QueryData } from '@supabase/supabase-js'
import { allJapaneseChunksQuery } from "./query"

export type AllJapaneseChunksType = QueryData<typeof allJapaneseChunksQuery>

export async function fetchAllJapaneseChunks(): Promise<AllJapaneseChunksType> {
  const { data, error } = await allJapaneseChunksQuery
  if (error) throw error
  return data
}
