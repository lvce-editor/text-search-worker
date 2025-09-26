import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as GetFilteredResults from '../GetFilteredResults/GetFilteredResults.ts'
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
  // Filter out child items when parent files are collapsed
  const filteredResults = GetFilteredResults.getFilteredResults(results, collapsedPaths)

  const displayResults: DisplaySearchResult[] = []
  const setSize = resultCount
  const searchTermLength = searchTerm.length
  const max = Math.min(filteredResults.length, maxLineY)
  for (let i = minLineY; i < max; i++) {
    const displayResult = GetSearchDisplayResult.getDisplayResult(
      filteredResults,
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
