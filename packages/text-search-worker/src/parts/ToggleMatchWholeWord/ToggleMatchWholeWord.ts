import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as ToggleSearchFlag from '../ToggleSearchFlag/ToggleSearchFlag.ts'

export const toggleMatchWholeWord = (state: SearchHeader): SearchHeader => {
  return ToggleSearchFlag.toggleSearchFlag(state, SearchFlags.MatchWholeWord)
}
