import type { SearchState } from '../SearchState/SearchState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderItems

export const isEqual = (oldState: SearchState, newState: SearchState): boolean => {
  return (
    oldState.collapsedPaths === newState.collapsedPaths &&
    oldState.deltaY === newState.deltaY &&
    oldState.flags === newState.flags &&
    oldState.focus === newState.focus &&
    oldState.icons === newState.icons &&
    oldState.items === newState.items &&
    oldState.listFocused === newState.listFocused &&
    oldState.listFocused === newState.listFocused &&
    oldState.listFocusedIndex === newState.listFocusedIndex &&
    oldState.loaded === newState.loaded &&
    oldState.maxLineY === newState.maxLineY &&
    oldState.message === newState.message &&
    oldState.minLineY === newState.minLineY &&
    oldState.replacement === newState.replacement &&
    oldState.searchInputErrorMessage === newState.searchInputErrorMessage
  )
}
