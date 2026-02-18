import { ViewletCommand } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'

export const renderCss = (oldState: SearchState, newState: SearchState): readonly any[] => {
  return [ViewletCommand.SetCss, newState.uid, ``]
}
