import type { SearchState } from '../SearchState/SearchState.ts'
import type { ViewModel } from '../ViewModel/ViewModel.ts'
import * as GetSearchDisplayResults from '../GetSearchDisplayResults/GetSearchDisplayResults.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

export const createViewModel = (state: SearchState): ViewModel => {
  // TODO add viewmodel to state, not needing to have separate states and making it easier to compare
  // visible items in diff
  const {
    listItems,
    itemHeight,
    fileCount,
    value,
    minLineY,
    maxLineY,
    replacement,
    icons,
    listFocusedIndex,
    collapsedPaths,
    items,
    listFocused,
    deltaY,
    finalDeltaY,
    height,
    headerHeight,
    flags,
    message,
    searchInputErrorMessage,
    scrollBarHeight,
    matchCount,
    focus,
  } = state
  const displayResults = GetSearchDisplayResults.getDisplayResults(
    listItems,
    itemHeight,
    fileCount,
    value,
    minLineY,
    maxLineY,
    replacement,
    icons,
    listFocusedIndex,
    collapsedPaths,
    items,
  )
  const focusOutline = listFocused && listFocusedIndex === -1
  const scrollBarValue = (deltaY / finalDeltaY) * 100
  const scrollBarY = ScrollBarFunctions.getScrollBarY(deltaY, finalDeltaY, height - headerHeight, scrollBarHeight)
  return {
    displayResults,
    flags,
    message,
    focusOutline,
    searchInputErrorMessage,
    scrollBarHeight,
    scrollBarY,
    scrollBarValue,
    deltaY,
    itemHeight,
    matchCount,
    focus,
  }
}
