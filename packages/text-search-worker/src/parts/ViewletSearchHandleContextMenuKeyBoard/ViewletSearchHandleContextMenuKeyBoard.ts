import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const handleContextMenuKeyboard = async (state: SearchState): Promise<SearchState> => {
  const x = state.x // TODO
  const y = state.y // TODO
  await ContextMenu.show(x, y, MenuEntryId.Search)
  return state
}
