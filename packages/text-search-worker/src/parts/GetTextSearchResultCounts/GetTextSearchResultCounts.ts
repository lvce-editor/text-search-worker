import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getTextSearchResultCounts = (results: readonly SearchResult[]) => {
  let resultCount = 0
  let fileCount = 0
  for (const result of results) {
    switch (result.type) {
      case TextSearchResultType.File:
        fileCount++
        break
      case TextSearchResultType.Match:
        resultCount++
        break
      default:
        break
    }
  }
  return { fileCount, resultCount }
}
