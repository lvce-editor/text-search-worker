import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFilteredResults from '../GetFilteredResults/GetFilteredResults.ts'
import * as ToggleCollapsedPath from '../ToggleCollapsedPath/ToggleCollapsedPath.ts'

export const selectIndexFile = async (state: SearchState, searchResult: SearchResult, index: number): Promise<SearchState> => {
  const { collapsedPaths, items, maxLineY } = state
  const path = searchResult.text
  const newCollapsedPaths = ToggleCollapsedPath.toggleCollapsedPath(collapsedPaths, path)
  const filteredResults = GetFilteredResults.getFilteredResults(items, newCollapsedPaths)
  const newMaxLineY = Math.min(maxLineY, filteredResults.length)
  return {
    ...state,
    collapsedPaths: newCollapsedPaths,
    listFocusedIndex: index,
    listFocused: true,
    listItems: filteredResults,
    maxLineY: newMaxLineY,
  }
}
