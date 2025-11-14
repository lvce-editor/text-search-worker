import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import { getNewMinMax } from '../GetNewMinMax/GetNewMinMax.ts'
import { removeItemFromItems } from '../RemoveItemFromItems/RemoveItemFromItems.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as ViewletSearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'

export const removeIndex = async (state: SearchState, index: number): Promise<SearchState> => {
  const { fileIconCache, minimumSliderSize, height, headerHeight, items, fileCount, matchCount, minLineY, maxLineY, deltaY, itemHeight } = state
  if (index === -1) {
    return state
  }
  const { newItems, newFocusedIndex, newMatchCount, newFileCount } = removeItemFromItems(items, index, matchCount, fileCount)
  const message = ViewletSearchStatusMessage.getStatusMessage(newMatchCount, newFileCount)
  const { newMinLineY, newMaxLineY, newDeltaY } = getNewMinMax(newItems.length, minLineY, maxLineY, deltaY, itemHeight)
  const total = newItems.length
  const contentHeight = total * itemHeight
  const listHeight = height - headerHeight
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const visible = newItems.slice(0, maxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visible, fileIconCache)

  return {
    ...state,
    deltaY: newDeltaY,
    fileCount: newFileCount,
    items: newItems,
    listItems: newItems,
    listFocusedIndex: newFocusedIndex,
    matchCount: newMatchCount,
    maxLineY: newMaxLineY,
    message,
    minLineY: newMinLineY,
    icons,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    scrollBarHeight,
  }
}
