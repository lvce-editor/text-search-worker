import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const togglePreserveCase = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    flags: SearchFlags.togglePreserveCase(state.flags),
  }
}
