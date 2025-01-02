import type { List } from '../List/List.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'

export const focusNext = <T, State extends List<T>>(state: State): State => {
  const { focusedIndex, items } = state
  const nextIndex = ListIndex.next(items, focusedIndex)
  return focusIndex(state, nextIndex)
}
