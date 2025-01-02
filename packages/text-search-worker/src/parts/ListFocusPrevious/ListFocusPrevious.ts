import type { List } from '../List/List.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'

export const focusPrevious = <T, State extends List<T>>(state: State): State => {
  const { focusedIndex, items } = state
  if (focusedIndex === 0 || focusedIndex === -1) {
    return state
  }
  const previousIndex = ListIndex.previous(items, focusedIndex)
  return focusIndex(state, previousIndex)
}
