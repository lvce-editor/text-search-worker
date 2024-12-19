import type { SearchState } from '../SearchState/SearchState.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const submit = (state: SearchState): Promise<SearchState> => {
  return ViewletSearchHandleUpdate.handleUpdate(state, { value: state.value, inputSource: InputSource.User })
}
