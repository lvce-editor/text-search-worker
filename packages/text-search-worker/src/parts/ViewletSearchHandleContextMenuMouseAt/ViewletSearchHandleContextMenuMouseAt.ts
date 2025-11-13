import { MenuEntryId } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleContextMenuMouseAt = async (state: SearchState, x: number, y: number): Promise<SearchState> => {
  const { uid } = state
  await ContextMenu.show2(uid, MenuEntryId.Search, x, y, {
    menuId: MenuEntryId.Search,
  })
  return state
}
