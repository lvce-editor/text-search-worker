import type { SearchState } from '../SearchState/SearchState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'

export const handleContextMenuMouseAt = async (state: SearchState, x: number, y: number): Promise<SearchState> => {
  await ContextMenu.show(x, y, MenuEntryId.Search)
  return state
}
