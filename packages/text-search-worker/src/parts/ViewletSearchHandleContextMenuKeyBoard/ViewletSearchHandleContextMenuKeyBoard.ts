import { MenuEntryId } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ContextMenu from '../ContextMenu/ContextMenu.ts'

export const handleContextMenuKeyboard = async (state: SearchState): Promise<SearchState> => {
  const { x, y } = state // TODO
  await ContextMenu.show(x, y, MenuEntryId.Search)
  return state
}
