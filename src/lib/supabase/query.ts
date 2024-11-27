import { db } from "./db"

export const allJapaneseChunksQuery = db
  .from("Lexical Chunks")
  .select("japanese_chunk, english_translation, kana")
