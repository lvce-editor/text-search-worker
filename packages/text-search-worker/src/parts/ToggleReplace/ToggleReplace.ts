import { SearchState } from '../SearchState/SearchState.ts'

export const toggleReplace = (state: SearchState): SearchState => {
  const { replaceExpanded } = state
  return {
    ...state,
    replaceExpanded: !replaceExpanded,
  }
}
