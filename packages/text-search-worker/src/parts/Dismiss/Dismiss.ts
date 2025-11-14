import type { SearchState } from '../SearchState/SearchState.ts'
import { getNewMinMax } from '../GetNewMinMax/GetNewMinMax.ts'
import { removeItemFromItems } from '../RemoveItemFromItems/RemoveItemFromItems.ts'
import * as ViewletSearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'

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
    deltaY: newDeltaY,
    fileCount: newFileCount,
    items: newItems,
    listFocusedIndex: newFocusedIndex,
    matchCount: newMatchCount,
    maxLineY: newMaxLineY,
    message,
    minLineY: newMinLineY,
  }
}
