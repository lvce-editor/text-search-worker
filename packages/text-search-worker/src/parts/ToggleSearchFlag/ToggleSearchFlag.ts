import type { SearchState } from '../SearchState/SearchState.ts'

export const toggleSearchFlag = (state: SearchState, flag: number): SearchState => {
  return {
    ...state,
    flags: state.flags ^ flag,
  }
}
