import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as GetSearchDisplayResult from '../GetSearchDisplayResult/GetSearchDisplayResult.ts'

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
  collapsedPaths: readonly string[],
  originalResults: readonly SearchResult[],
): readonly DisplaySearchResult[] => {
  const displayResults: DisplaySearchResult[] = []
  const setSize = resultCount
  const searchTermLength = searchTerm.length
  for (let i = minLineY; i < maxLineY; i++) {
    const displayResult = GetSearchDisplayResult.getDisplayResult(
      results,
      fileIcons,
      i,
      setSize,
      searchTermLength,
      replacement,
      focusedIndex,
      collapsedPaths,
      minLineY,
      originalResults,
    )
    displayResults.push(displayResult)
  }
  return displayResults
}
