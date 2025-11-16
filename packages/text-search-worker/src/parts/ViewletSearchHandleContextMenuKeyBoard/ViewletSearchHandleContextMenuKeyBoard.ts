import { MenuEntryId } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleContextMenuKeyboard = async (state: SearchState): Promise<SearchState> => {
  const { x, y, uid } = state // TODO
  await ContextMenu.show2(uid, MenuEntryId.Search, x, y, {
    menuId: MenuEntryId.Search,
    index: 0, // TODO pass proper index
  })
  return state
}
