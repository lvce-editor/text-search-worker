import type { List } from '../List/List.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'
import * as ListIndex from '../ListIndex/ListIndex.ts'

export const focusFirst = <T, State extends List<T>>(state: State): State => {
  const firstIndex = ListIndex.first()
  return focusIndex(state, firstIndex)
}
