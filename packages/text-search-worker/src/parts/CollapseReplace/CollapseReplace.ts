import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const collapseReplace = (state: SearchState): SearchState => {
  const { flags } = state
  return {
    ...state,
    flags: flags & ~SearchFlags.ReplaceExpanded,
  }
}
