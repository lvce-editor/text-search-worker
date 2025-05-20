import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getTotalResults = (results: readonly SearchResult[]): number => {
  return results.filter((result) => result.type === TextSearchResultType.Match).length
}
