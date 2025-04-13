import type { SearchState } from '../SearchState/SearchState.ts'

export const renderFocusContext = (oldState: SearchState, newState: SearchState): readonly any[] => {
  return ['Viewlet.setFocusContext', newState.focus]
}
