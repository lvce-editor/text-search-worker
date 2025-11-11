import type { SearchState } from '../SearchState/SearchState.ts'
import { collapseReplace } from '../CollapseReplace/CollapseReplace.ts'
import { expandReplace } from '../ExpandReplace/ExpandReplace.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const toggleReplace = async (state: SearchState): Promise<SearchState> => {
  if (SearchFlags.hasReplaceExpanded(state.flags)) {
    return collapseReplace(state)
  }
  return expandReplace(state)
}
