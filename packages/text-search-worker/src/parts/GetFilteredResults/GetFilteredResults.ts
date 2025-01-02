import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getFilteredResults = (results: readonly SearchResult[], collapsedPaths: readonly string[]): readonly SearchResult[] => {
  if (collapsedPaths.length === 0) {
    return results
  }
  const filteredResults: SearchResult[] = []
  let isExcluded = false
  for (const result of results) {
    if (result.type === TextSearchResultType.File) {
      filteredResults.push(result)
      if (collapsedPaths.includes(result.text)) {
        isExcluded = true
      } else {
        isExcluded = false
      }
    }
    if (!isExcluded) {
      filteredResults.push(result)
    }
  }
  return filteredResults
}
