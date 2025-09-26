import type { SavedState } from '../SavedState/SavedState.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const saveState = (state: SearchState): SavedState => {
  const { value, replacement, flags, includeValue, excludeValue, history, collapsedPaths, focus, listFocused } = state
  return {
    value,
    replacement,
    flags,
    includeValue,
    excludeValue,
    history,
    collapsedPaths,
    focus,
    listFocused,
  }
}
