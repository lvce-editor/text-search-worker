import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as ToggleSearchFlag from '../ToggleSearchFlag/ToggleSearchFlag.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const toggleDetailsExpanded = (state: SearchHeader): SearchHeader => {
  const newState = ToggleSearchFlag.toggleSearchFlag(state, SearchFlags.DetailsExpanded)
  if (SearchFlags.hasDetailsExpanded(newState.flags)) {
    return {
      ...newState,
      focus: WhenExpression.FocusSearchIncludeInput,
      focusSource: InputSource.Script,
    }
  }
  return {
    ...newState,
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
  }
}
