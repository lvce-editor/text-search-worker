import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const toggleMatchWholeWord = (state: SearchState): SearchState => {
  return {
    ...state,
    flags: SearchFlags.toggleMatchWholeWord(state.flags),
  }
}
