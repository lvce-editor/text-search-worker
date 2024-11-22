import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const collapseDetails = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    flags: state.flags & ~SearchFlags.DetailsExpanded,
  }
}
