import type { ResultCounts } from '../ResultCounts/ResultCounts.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getTextSearchResultCounts = (results: readonly SearchResult[]): ResultCounts => {
  let resultCount = 0
  let fileCount = 0
  for (const result of results) {
    if (result.type === TextSearchResultType.File) {
      fileCount++
    } else if (result.type === TextSearchResultType.Match) {
      resultCount++
    }
  }
  return { fileCount, resultCount }
}
