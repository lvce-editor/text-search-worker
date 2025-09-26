import { ViewletCommand } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'

export const renderFocusContext = (oldState: SearchState, newState: SearchState): readonly any[] => {
  return [ViewletCommand.SetFocusContext, newState.uid, newState.focus]
}
