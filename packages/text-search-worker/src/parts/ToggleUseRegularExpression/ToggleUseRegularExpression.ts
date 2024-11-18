import type { SearchState } from '../SearchState/SearchState.ts'

export const toggleUseRegularExpression = (state: SearchState): SearchState => {
  const { useRegularExpression } = state
  return {
    ...state,
    useRegularExpression: !useRegularExpression,
  }
}
