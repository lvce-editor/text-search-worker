import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const toggleDetailsExpanded = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    flags: SearchFlags.toggleDetailsExpanded(state.flags),
  }
}
