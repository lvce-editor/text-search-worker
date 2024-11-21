import * as Assert from '../Assert/Assert.ts'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const selectIndexFile = (state: SearchState, searchResult: DisplaySearchResult, index: number): SearchState => {
  const { collapsedPaths } = state
  const path = Workspace.getAbsolutePath(searchResult.text)
  Assert.string(path)
  return {
    ...state,
    collapsedPaths: [...collapsedPaths, path],
    listFocusedIndex: index,
    listFocused: true,
  }
}
