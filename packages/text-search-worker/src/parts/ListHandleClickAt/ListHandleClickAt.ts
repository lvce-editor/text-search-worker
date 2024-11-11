import * as GetListIndex from '../GetListIndex/GetListIndex.js'
import { SearchState } from '../SearchState/SearchState.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'

export const handleClickAt = async (state: SearchState, eventX: number, eventY: number): Promise<SearchState> => {
  const { x, y, itemHeight, deltaY } = state
  const index = GetListIndex.getListIndex(eventX, eventY, x, y, deltaY, itemHeight)
  return SelectIndex.selectIndex(state, index, false)
}
