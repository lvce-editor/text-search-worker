import type { SearchState } from '../SearchState/SearchState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderItems

export const isEqual = (oldState: SearchState, newState: SearchState): boolean => {
  return (
    oldState.items === newState.items &&
    oldState.minLineY === newState.minLineY &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.replacement === newState.replacement &&
    oldState.flags === newState.flags &&
    oldState.message === newState.message &&
    oldState.loaded === newState.loaded &&
    oldState.collapsedPaths === newState.collapsedPaths &&
    oldState.listFocusedIndex === newState.listFocusedIndex &&
    oldState.listFocused === newState.listFocused &&
    oldState.icons === newState.icons &&
    oldState.searchInputErrorMessage === newState.searchInputErrorMessage &&
    oldState.deltaY === newState.deltaY
  )
}
