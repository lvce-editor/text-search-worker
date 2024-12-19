import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const clearSearchResults = (state: SearchState): SearchState => {
  return {
    ...state,
    value: '',
    items: [],
    minLineY: 0,
    maxLineY: 0,
    message: '',
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
  }
}
