import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const handleContextMenuMouseAt = async (state: SearchState, x: number, y: number): Promise<SearchState> => {
  await ContextMenu.show(x, y, MenuEntryId.Search)
  return state
}
