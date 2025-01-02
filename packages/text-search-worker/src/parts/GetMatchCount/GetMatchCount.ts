import { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getMatchCount = (results: readonly SearchResult[], startIndex: number): number => {
  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    if (result.type === TextSearchResultType.File) {
      return i - startIndex
    }
  }
  return results.length - startIndex
}
