import * as GetSearchDisplayResult from '../GetSearchDisplayResult/GetSearchDisplayResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const getFilteredResults = (results: readonly SearchResult[], collapsedPaths: readonly string[]) => {
  const filteredResults = []
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
) => {
  const displayResults = []
  const filteredResults = getFilteredResults(results, collapsedPaths)
  const setSize = resultCount
  let fileIndex = 0
  for (let i = 0; i < minLineY; i++) {
    const result = filteredResults[i]
    switch (result.type) {
      case TextSearchResultType.File:
        fileIndex++
        break
      default:
        break
    }
  }
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
