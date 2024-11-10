import * as InputSource from '../InputSource/InputSource.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

export const submit = (state: SearchState): Promise<SearchState> => {
  return ViewletSearchHandleUpdate.handleUpdate(state, { value: state.value, inputSource: InputSource.User })
}
