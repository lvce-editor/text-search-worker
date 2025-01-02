import type { List } from '../List/List.ts'
import * as Arrays from '../Arrays/Arrays.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'

export const focusNextPage = <T, State extends List<T>>(state: State): State => {
  const { focusedIndex, items, maxLineY, minLineY } = state
  if (Arrays.isLastIndex(items, focusedIndex)) {
    return state
  }
  const indexNextPage = Math.min(maxLineY + (maxLineY - minLineY) - 2, Arrays.lastIndex(items))
  return focusIndex(state, indexNextPage)
}
