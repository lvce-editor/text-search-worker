import * as FocusMatchCase from '../FocusMatchCase/FocusMatchCase.ts'
import * as FocusReplaceValue from '../FocusReplaceValue/FocusReplaceValue.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const focusSearchValueNext = (state: SearchState): SearchState => {
  const { replaceExpanded } = state
  if (replaceExpanded) {
    return FocusReplaceValue.focusReplaceValue(state)
  }
  return FocusMatchCase.focusMatchCase(state)
}
