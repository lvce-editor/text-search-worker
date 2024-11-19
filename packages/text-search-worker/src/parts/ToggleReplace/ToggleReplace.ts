import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as ToggleSearchFlag from '../ToggleSearchFlag/ToggleSearchFlag.ts'

export const toggleReplace = (state: SearchHeader): SearchHeader => {
  return ToggleSearchFlag.toggleSearchFlag(state, SearchFlags.ReplaceExpanded)
}
