import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const toggleMatchCase = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    flags: SearchFlags.toggleMatchCase(state.flags),
  }
}
