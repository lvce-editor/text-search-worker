import { SearchState } from '../SearchState/SearchState.ts'
import { setDeltaY } from '../SetDeltaY/SetDeltaY.ts'

const getNewPercent = (contentHeight: number, scrollBarHeight: number, relativeY: number): number => {
  if (relativeY <= contentHeight - scrollBarHeight / 2) {
    // clicked in middle
    return relativeY / (contentHeight - scrollBarHeight)
  }
  // clicked at bottom
  return 1
}

export const handleScrollBarMove = (state: SearchState, eventY: number): SearchState => {
  const { y, headerHeight, handleOffset, finalDeltaY, height, scrollBarHeight } = state
  const relativeY = eventY - y - headerHeight - handleOffset
  const contentHeight = height - headerHeight
  const newPercent = getNewPercent(contentHeight, scrollBarHeight, relativeY)
  const newDeltaY = newPercent * finalDeltaY
  return setDeltaY(state, newDeltaY)
}
