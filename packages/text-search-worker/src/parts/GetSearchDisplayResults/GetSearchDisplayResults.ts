import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as GetSearchDisplayResult from '../GetSearchDisplayResult/GetSearchDisplayResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getDisplayResults = (
  results: readonly SearchResult[],
  itemHeight: number,
  resultCount: number,
  searchTerm: string,
  minLineY: number,
  maxLineY: number,
  replacement: string,
  fileIcons: readonly string[],
  focusedIndex: number,
): readonly DisplaySearchResult[] => {
  const displayResults: DisplaySearchResult[] = []
  const setSize = resultCount
  const searchTermLength = searchTerm.length
  let fileResult = {
    matchCount: 0,
  }
  let fileIconIndex = 0
  for (let i = minLineY; i < maxLineY; i++) {
    const result = results[i]
    const displayResult = GetSearchDisplayResult.getDisplayResult(
      result,
      fileIcons,
      fileIconIndex,
      itemHeight,
      i,
      setSize,
      searchTermLength,
      replacement,
      focusedIndex,
    )
    displayResults.push(displayResult)
    if (result.type === TextSearchResultType.File) {
      fileResult = displayResult
      fileIconIndex++
    } else {
      fileResult.matchCount++
    }
  }
  return displayResults
}
