import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetListIndex from '../GetListIndex/GetListIndex.ts'
import * as GetTopHeight from '../GetTopHeight/GetTopHeight.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const handleClickAt = (state: SearchState, eventX: number, eventY: number): Promise<SearchState> => {
  const { x, y, itemHeight, deltaY, flags } = state
  const topHeight = GetTopHeight.getTopHeight(flags)
  const index = GetListIndex.getListIndex(eventX, eventY, x, y, deltaY, itemHeight, topHeight)
  return SelectIndex.selectIndex(state, index)
}
