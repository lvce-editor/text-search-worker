import { diff } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetSearchDisplayResults from '../GetSearchDisplayResults/GetSearchDisplayResults.ts'
import * as GetSearchVirtualDom from '../GetSearchVirtualDom/GetSearchVirtualDom.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

const getDom = (state: SearchState): any => {
  const displayResults = GetSearchDisplayResults.getDisplayResults(
    state.listItems,
    state.itemHeight,
    state.fileCount,
    state.value,
    state.minLineY,
    state.maxLineY,
    state.replacement,
    state.icons,
    state.listFocusedIndex,
    state.collapsedPaths,
    state.items,
  )
  const focusOutline = state.listFocused && state.listFocusedIndex === -1
  const scrollBarValue = (state.deltaY / state.finalDeltaY) * 100
  const scrollBarY = ScrollBarFunctions.getScrollBarY(state.deltaY, state.finalDeltaY, state.height - state.headerHeight, state.scrollBarHeight)
  const dom = GetSearchVirtualDom.getSearchVirtualDom(
    displayResults,
    state.flags,
    state.message,
    focusOutline,
    state.searchInputErrorMessage,
    state.scrollBarHeight,
    scrollBarY,
    scrollBarValue,
    state.deltaY,
    state.itemHeight,
    state.matchCount,
    state.limitHitWarning,
    state.focus,
  )
  return dom
}

// TODO cache rendered dom so that it can be used for dom diffing
export const renderIncremental = (uid: number): readonly any[] => {
  const { oldState, newState } = SearchViewStates.get(uid)
  const oldDom = getDom(oldState)
  const newDom = getDom(newState)
  const patches = diff(oldDom, newDom)
  return patches
}
