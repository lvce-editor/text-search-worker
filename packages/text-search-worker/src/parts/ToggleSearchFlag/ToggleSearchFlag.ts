import type { SearchState } from '../SearchState/SearchState.ts'
import * as HandleUpdate from '../HandleUpdate/HandleUpdate.ts'

export const toggleSearchFlag = (state: SearchState, flag: number): Promise<SearchState> => {
  return HandleUpdate.handleUpdate(state, {
    flags: state.flags ^ flag,
  })
}
