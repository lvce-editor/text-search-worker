import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'

export const expandDetails = (state: SearchState): SearchState => {
  const { flags } = state
  return {
    ...state,
    flags: flags | SearchFlags.DetailsExpanded,
    focus: WhenExpression.FocusSearchIncludeInput,
    focusSource: InputSource.Script,
  }
}
