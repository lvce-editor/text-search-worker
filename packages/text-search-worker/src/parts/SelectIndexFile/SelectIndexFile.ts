import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetFilteredResults from '../GetFilteredResults/GetFilteredResults.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ToggleCollapsedPath from '../ToggleCollapsedPath/ToggleCollapsedPath.ts'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'

export const selectIndexFile = async (state: SearchState, searchResult: SearchResult, index: number): Promise<SearchState> => {
  const { collapsedPaths, items, itemHeight, headerHeight, height } = state
  const path = searchResult.text
  const newCollapsedPaths = ToggleCollapsedPath.toggleCollapsedPath(collapsedPaths, path)
  const filteredResults = GetFilteredResults.getFilteredResults(items, newCollapsedPaths)
  const icons = await GetFileIcons.getFileIcons(filteredResults)
  const total = filteredResults.length
  const listHeight = height - headerHeight
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(numberOfVisible, total)
  return {
    ...state,
    collapsedPaths: newCollapsedPaths,
    listFocusedIndex: index,
    listFocused: true,
    listItems: filteredResults,
    maxLineY,
    icons,
    focus: WhenExpression.FocusSearchResults,
    focusSource: InputSource.Script,
  }
}
