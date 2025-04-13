import type { SearchState } from '../SearchState/SearchState.ts'
import * as Focus from '../Focus/Focus.ts'
import * as GetSearchFocusKey from '../GetSearchFocusKey/GetSearchFocusKey.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const handleFocusIn = async (state: SearchState, key: string): Promise<SearchState> => {
  const focusKey = GetSearchFocusKey.getSearchFocusKey(key)
  if (state.focus === focusKey) {
    return state
  }
  await Focus.setFocus(WhenExpression.FocusSearch)
  return {
    ...state,
    focus: focusKey,
    focusSource: InputSource.User,
  }
}
