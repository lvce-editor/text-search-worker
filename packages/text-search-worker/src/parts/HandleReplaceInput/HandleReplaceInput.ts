import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as HandleUpdate from '../HandleUpdate/HandleUpdate.ts'

export const handleReplaceInput = (state: SearchState, value: string, inputSource = InputSource.Script): Promise<SearchState> => {
  return HandleUpdate.handleUpdate(state, {
    replacement: value,
    inputSource,
  })
}
