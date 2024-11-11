import { SearchState } from '../SearchState/SearchState.ts'
import * as ViewletSearchHandleUpdate from '../HandleUpdate/HandleUpdate.ts'

export const refresh = (state: SearchState): Promise<SearchState> => {
  return ViewletSearchHandleUpdate.handleUpdate(state, {})
}
