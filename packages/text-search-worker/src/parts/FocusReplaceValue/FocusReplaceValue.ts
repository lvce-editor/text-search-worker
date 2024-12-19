import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const focusReplaceValue = (state: SearchState): SearchState => {
  return {
    ...state,
    focus: WhenExpression.FocusSearchReplaceInput,
    focusSource: InputSource.Script,
  }
}
