import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as CollapseDetails from '../CollapseDetails/CollapseDetails.ts'
import * as ExpandDetails from '../ExpandDetails/ExpandDetails.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const toggleDetailsExpanded = (state: SearchHeader): SearchHeader => {
  if (SearchFlags.hasDetailsExpanded(state.flags)) {
    return CollapseDetails.collapseDetails(state)
  }
  return ExpandDetails.expandDetails(state)
}
