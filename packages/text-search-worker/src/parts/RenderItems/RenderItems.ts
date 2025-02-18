import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchDisplayResults from '../GetSearchDisplayResults/GetSearchDisplayResults.ts'
import * as GetSearchVirtualDom from '../GetSearchVirtualDom/GetSearchVirtualDom.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

export const renderItems = (oldState: SearchState, newState: SearchState): any => {
  const displayResults = GetSearchDisplayResults.getDisplayResults(
    newState.listItems,
    newState.itemHeight,
    newState.fileCount,
    newState.value,
    newState.minLineY,
    newState.maxLineY,
    newState.replacement,
    newState.icons,
    newState.listFocusedIndex,
    newState.collapsedPaths,
    newState.items,
  )
  const focusOutline = newState.listFocused && newState.listFocusedIndex === -1
  const scrollBarValue = (newState.deltaY / newState.finalDeltaY) * 100
  const scrollBarY = ScrollBarFunctions.getScrollBarY(
    newState.deltaY,
    newState.finalDeltaY,
    newState.height - newState.headerHeight,
    newState.scrollBarHeight,
  )
  const dom = GetSearchVirtualDom.getSearchVirtualDom(
    displayResults,
    newState.flags,
    newState.message,
    focusOutline,
    newState.searchInputErrorMessage,
    newState.scrollBarHeight,
    scrollBarY,
    scrollBarValue,
    newState.deltaY,
    newState.itemHeight,
    newState.matchCount,
  )
  return ['Viewlet.setDom2', newState.uid, dom]
}
