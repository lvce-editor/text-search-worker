import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const expandDetails = (state: SearchHeader): SearchHeader => {
  return {
    ...state,
    flags: state.flags | SearchFlags.DetailsExpanded,
    focus: WhenExpression.FocusSearchIncludeInput,
    focusSource: InputSource.Script,
  }
}
