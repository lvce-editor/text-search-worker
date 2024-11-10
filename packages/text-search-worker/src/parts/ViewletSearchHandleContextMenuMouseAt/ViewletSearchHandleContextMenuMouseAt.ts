import * as ContextMenu from '../ContextMenu/ContextMenu.js'
import * as MenuEntryId from '../MenuEntryId/MenuEntryId.js'
import type { SearchState } from '../SearchState/SearchState.ts'

export const handleContextMenuMouseAt = async (state: SearchState, x: number, y: number) => {
  await ContextMenu.show(x, y, MenuEntryId.Search)
  return state
}
