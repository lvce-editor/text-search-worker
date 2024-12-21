import type { SearchState } from '../SearchState/SearchState.ts'
import * as MouseEventType from '../MouseEventType/MouseEventType.ts'
import * as ViewletSearchHandleContextMenuKeyBoard from '../ViewletSearchHandleContextMenuKeyBoard/ViewletSearchHandleContextMenuKeyBoard.ts'
import * as ViewletSearchHandleContextMenuMouseAt from '../ViewletSearchHandleContextMenuMouseAt/ViewletSearchHandleContextMenuMouseAt.ts'

export const handleContextMenu = (state: SearchState, button: number, x: number, y: number): Promise<SearchState> => {
  switch (button) {
    case MouseEventType.Keyboard:
      return ViewletSearchHandleContextMenuKeyBoard.handleContextMenuKeyboard(state)
    default:
      return ViewletSearchHandleContextMenuMouseAt.handleContextMenuMouseAt(state, x, y)
  }
}
