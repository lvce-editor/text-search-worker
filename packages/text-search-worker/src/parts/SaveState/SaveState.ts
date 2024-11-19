import type { SavedState } from '../SavedState/SavedState.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const saveState = (uid: number): SavedState => {
  const { newState } = SearchViewStates.get(uid)
  const { value, replaceExpanded, replacement, preserveCase, matchCase, matchWholeWord, useRegularExpression } = newState
  return {
    value,
    replacement,
    replaceExpanded,
    preserveCase,
    matchCase,
    matchWholeWord,
    useRegularExpression,
  }
}
