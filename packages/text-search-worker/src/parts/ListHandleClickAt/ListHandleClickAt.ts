import * as GetListIndex from '../GetListIndex/GetListIndex.ts'
import * as GetTopHeight from '../GetTopHeight/GetTopHeight.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const handleClickAt = async (state: SearchState, eventX: number, eventY: number): Promise<SearchState> => {
  const { x, y, itemHeight, deltaY, flags } = state
  const topHeight = GetTopHeight.getTopHeight(flags)
  const index = GetListIndex.getListIndex(eventX, eventY, x, y, deltaY, itemHeight, topHeight)
  console.log({ index })
  return state
}
