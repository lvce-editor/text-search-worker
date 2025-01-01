import type { SearchState } from '../SearchState/SearchState.ts'
import * as CollapseDetails from '../CollapseDetails/CollapseDetails.ts'
import * as ExpandDetails from '../ExpandDetails/ExpandDetails.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const toggleDetailsExpanded = (state: SearchState): Promise<SearchState> => {
  if (SearchFlags.hasDetailsExpanded(state.flags)) {
    return CollapseDetails.collapseDetails(state)
  }
  return ExpandDetails.expandDetails(state)
}
