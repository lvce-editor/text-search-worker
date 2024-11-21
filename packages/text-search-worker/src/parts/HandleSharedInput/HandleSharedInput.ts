import * as HandleReplaceInput from '../HandleReplaceInput/HandleReplaceInput.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const handleSharedInput = async (state: SearchState, name: string, value: string, inputSource = InputSource.Script): Promise<SearchState> => {
  switch (name) {
    case 'search-value':
      return HandleInput.handleInput(state, value, inputSource)
    case 'replacement-value':
      return HandleReplaceInput.handleReplaceInput(state, value, inputSource)
    default:
      return state
  }
}
