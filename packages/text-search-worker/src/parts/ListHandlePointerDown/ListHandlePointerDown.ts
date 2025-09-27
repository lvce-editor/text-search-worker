import { MouseEventType } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'

export const handleListPointerDown = async (state: SearchState, button: number): Promise<SearchState> => {
  if (button !== MouseEventType.LeftClick) {
    return state
  }
  // TODO set list to focused and render focus outline
  return {
    ...state,
    listFocused: true,
  }
}
