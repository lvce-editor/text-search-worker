import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import * as GetSearchDisplayResult from '../GetSearchDisplayResult/GetSearchDisplayResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const getFilteredResults = (results: readonly SearchResult[], collapsedPaths: readonly string[]): readonly SearchResult[] => {
  const filteredResults: SearchResult[] = []
  let isExcluded = false
  for (const result of results) {
    if (result.type === TextSearchResultType.File) {
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

export const getDisplayResults = (
  results: readonly SearchResult[],
  itemHeight: number,
  resultCount: number,
  searchTerm: string,
  minLineY: number,
  maxLineY: number,
  replacement: string,
  collapsedPaths: readonly string[],
  fileIcons: readonly string[],
  focusedIndex: number,
): readonly DisplaySearchResult[] => {
  const displayResults = []
  const filteredResults = getFilteredResults(results, collapsedPaths)
  const setSize = resultCount
  const searchTermLength = searchTerm.length
  let fileResult = {
    matchCount: 0,
  }
  let fileIconIndex = 0
  for (let i = minLineY; i < maxLineY; i++) {
    const result = filteredResults[i]
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
