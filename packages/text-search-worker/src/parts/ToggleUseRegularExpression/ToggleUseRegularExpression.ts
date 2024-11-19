import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const toggleUseRegularExpression = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    flags: SearchFlags.toggleUseRegularExpression(state.flags),
  }
}
