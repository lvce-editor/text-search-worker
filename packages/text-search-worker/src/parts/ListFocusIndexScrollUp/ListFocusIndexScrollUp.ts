import type { List } from '../List/List.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'

export const focusIndexScrollUp = <T, State extends List<T>>(
  state: State,
  index: number,
  listHeight: number,
  itemHeight: number,
  itemsLength: number,
): State => {
  const newMinLineY = index
  const fittingItems = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const newMaxLineY = Math.min(newMinLineY + fittingItems, itemsLength)
  const newDeltaY = newMinLineY * itemHeight
  return {
    ...state,
    focusedIndex: index,
    minLineY: newMinLineY,
    maxLineY: newMaxLineY,
    focused: true,
    deltaY: newDeltaY,
  }
}
