import type { List } from '../List/List.ts'
import * as Assert from '../Assert/Assert.ts'
import * as FocusIndexScrollDown from '../ListFocusIndexScrollDown/ListFocusIndexScrollDown.ts'
import * as FocusIndexScrollUp from '../ListFocusIndexScrollUp/ListFocusIndexScrollUp.ts'

export const focusIndex = <T, State extends List<T>>(state: State, index: number): State => {
  const { itemHeight, minLineY, maxLineY, headerHeight, height, items } = state
  const itemsLength = items.length
  if (itemsLength === 0) {
    return state
  }
  Assert.number(itemHeight)
  if (index === -1) {
    return {
      ...state,
      focusedIndex: -1,
      focused: true,
    }
  }
  const listHeight = height - headerHeight
  if (index < minLineY + 1) {
    return FocusIndexScrollUp.focusIndexScrollUp(state, index, listHeight, itemHeight, itemsLength)
  }
  if (index >= maxLineY - 1) {
    return FocusIndexScrollDown.focusIndexScrollDown(state, index, listHeight, itemHeight, itemsLength)
  }
  return {
    ...state,
    focusedIndex: index,
    focused: true,
  }
}
