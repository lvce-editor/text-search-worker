import type { SavedState } from '../SavedState/SavedState.ts'
import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'

export const saveState = (state: SearchHeader): SavedState => {
  return {
    value: state.value,
    replacement: state.replacement,
    flags: state.flags,
    includeValue: state.includeValue,
    excludeValue: state.excludeValue,
  }
}
