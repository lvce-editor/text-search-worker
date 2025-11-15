import { MenuEntryId } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as GetListIndex from '../GetListIndex/GetListIndex.ts'
import * as GetTopHeight from '../GetTopHeight/GetTopHeight.ts'

export const handleContextMenuMouseAt = async (state: SearchState, eventX: number, eventY: number): Promise<SearchState> => {
  const { uid, x, y, itemHeight, deltaY, flags, listItems } = state
  const topHeight = GetTopHeight.getTopHeight(flags)
  const index = GetListIndex.getListIndex(eventX, eventY, x, y, deltaY, itemHeight, topHeight, listItems.length)
  await ContextMenu.show2(uid, MenuEntryId.Search, x, y, {
    menuId: MenuEntryId.Search,
    index,
  })
  return state
}
