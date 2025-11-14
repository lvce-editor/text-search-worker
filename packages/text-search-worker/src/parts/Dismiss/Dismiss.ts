import type { SearchState } from '../SearchState/SearchState.ts'
import { removeItemFromItems } from '../RemoveItemFromItems/RemoveItemFromItems.ts'
import * as ViewletSearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'

interface MinMaxResult {
  newDeltaY: number
  newMinLineY: number
  newMaxLineY: number
}

const getNewMinMax = (newItemsLength: number, minLineY: number, maxLineY: number, deltaY: number, itemHeight: number): MinMaxResult => {
  if (maxLineY > newItemsLength) {
    const diff = maxLineY - minLineY
    const newMinLineY = Math.max(newItemsLength - diff, 0)
    const newDeltaY = newMinLineY * itemHeight
    return {
      newDeltaY,
      newMinLineY,
      newMaxLineY: newItemsLength,
    }
  }
  return {
    newDeltaY: deltaY,
    newMinLineY: minLineY,
    newMaxLineY: maxLineY,
  }
}
export const dismissItem = (state: SearchState): SearchState => {
  const { items, listFocusedIndex, fileCount, matchCount, minLineY, maxLineY, deltaY, itemHeight } = state
  if (listFocusedIndex === -1) {
    return state
  }
  const { newItems, newFocusedIndex, newMatchCount, newFileCount } = removeItemFromItems(items, listFocusedIndex, matchCount, fileCount)
  const message = ViewletSearchStatusMessage.getStatusMessage(newMatchCount, newFileCount)
  const { newMinLineY, newMaxLineY, newDeltaY } = getNewMinMax(newItems.length, minLineY, maxLineY, deltaY, itemHeight)
  return {
    ...state,
    items: newItems,
    listFocusedIndex: newFocusedIndex,
    message,
    matchCount: newMatchCount,
    fileCount: newFileCount,
    minLineY: newMinLineY,
    maxLineY: newMaxLineY,
    deltaY: newDeltaY,
  }
}
