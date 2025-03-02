import * as GetFocusSelector from '../GetFocusSelector/GetFocusSelector.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const renderFocus = (oldState: SearchState, newState: SearchState): readonly any[] => {
  const selector = GetFocusSelector.getFocusSelector(newState.focus)
  return ['Viewlet.focusElementByName', newState.uid, selector]
}
