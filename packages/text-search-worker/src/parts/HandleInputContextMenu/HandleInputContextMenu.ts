import type { SearchState } from '../SearchState/SearchState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleInputContextMenu = async (state: SearchState, button: number, x: number, y: number): Promise<SearchState> => {
  const { uid } = state
  const menuId = 91
  await ContextMenu.show2(uid, menuId, x, y, {
    menuId,
  })
  return state
}
