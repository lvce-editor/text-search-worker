import * as Assert from '../Assert/Assert.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

const focusIndexScrollUp = (state: SearchState, index: number, listHeight: number, itemHeight: number, itemsLength: number): SearchState => {
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

const focusIndexScrollDown = (state: SearchState, index: number, listHeight: number, itemHeight: number, itemsLength: number): SearchState => {
  const newMaxLineY = Math.min(index + 1, itemsLength)
  const fittingItems = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const newMinLineY = Math.max(newMaxLineY - fittingItems, 0)
  const newDeltaY = itemsLength < fittingItems ? 0 : newMinLineY * itemHeight - (listHeight % itemHeight) + itemHeight
  return {
    ...state,
    focusedIndex: index,
    minLineY: newMinLineY,
    maxLineY: newMaxLineY,
    focused: true,
    deltaY: newDeltaY,
  }
}

export const focusIndex = (state: SearchState, index: number): SearchState => {
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
    return focusIndexScrollUp(state, index, listHeight, itemHeight, itemsLength)
  }
  if (index >= maxLineY - 1) {
    return focusIndexScrollDown(state, index, listHeight, itemHeight, itemsLength)
  }
  return {
    ...state,
    focusedIndex: index,
    focused: true,
  }
}
