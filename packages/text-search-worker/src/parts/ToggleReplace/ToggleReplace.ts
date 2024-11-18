import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'

export const toggleReplace = (state: SearchHeader): SearchHeader => {
  const { replaceExpanded } = state
  return {
    ...state,
    replaceExpanded: !replaceExpanded,
  }
}
