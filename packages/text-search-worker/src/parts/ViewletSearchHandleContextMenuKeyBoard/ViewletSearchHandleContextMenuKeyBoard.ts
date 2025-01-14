import type { SearchState } from '../SearchState/SearchState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const handleContextMenuKeyboard = async (state: SearchState): Promise<SearchState> => {
  const { x } = state // TODO
  const { y } = state // TODO
  await ContextMenu.show(x, y, MenuEntryId.Search)
  return state
}
