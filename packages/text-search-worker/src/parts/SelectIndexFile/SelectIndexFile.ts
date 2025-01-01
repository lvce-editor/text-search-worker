import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as AddCollapsedPath from '../AddCollapsedPath/AddCollapsedPath.ts'
import * as GetFilteredResults from '../GetFilteredResults/GetFilteredResults.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const selectIndexFile = (state: SearchState, searchResult: DisplaySearchResult, index: number): SearchState => {
  const { collapsedPaths, items, maxLineY } = state
  const path = Workspace.getAbsolutePath(searchResult.text)
  const newCollapsedPaths = AddCollapsedPath.addCollapsedPath(collapsedPaths, path)
  const filteredResults = GetFilteredResults.getFilteredResults(items, collapsedPaths)
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
