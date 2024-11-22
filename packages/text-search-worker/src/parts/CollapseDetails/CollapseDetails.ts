import * as InputSource from '../InputSource/InputSource.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as ToggleSearchFlag from '../ToggleSearchFlag/ToggleSearchFlag.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const collapseDetails = (state: SearchHeader): SearchHeader => {
  return {
    ...ToggleSearchFlag.toggleSearchFlag(state, SearchFlags.DetailsExpanded),
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
  }
}
