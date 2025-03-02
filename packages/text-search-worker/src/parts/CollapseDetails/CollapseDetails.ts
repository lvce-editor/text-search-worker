import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as ToggleSearchFlag from '../ToggleSearchFlag/ToggleSearchFlag.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const collapseDetails = async (state: SearchState): Promise<SearchState> => {
  const defaultState = await ToggleSearchFlag.toggleSearchFlag(state, SearchFlags.DetailsExpanded)
  return {
    ...defaultState,
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
  }
}
