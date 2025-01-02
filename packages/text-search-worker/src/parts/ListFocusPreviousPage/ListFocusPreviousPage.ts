import type { List } from '../List/List.ts'
import { focusIndex } from '../ListFocusIndex/ListFocusIndex.ts'

export const focusPreviousPage = <T, State extends List<T>>(state: State): State => {
  const { focusedIndex, minLineY, maxLineY } = state
  if (focusedIndex === 0 || focusedIndex === -1) {
    return state
  }
  const indexPreviousPage = Math.max(minLineY - (maxLineY - minLineY) + 1, 0)
  return focusIndex(state, indexPreviousPage)
}
