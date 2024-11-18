import type { SearchState } from '../SearchState/SearchState.ts'

export const toggleMatchCase = (state: SearchState): SearchState => {
  const { matchCase } = state
  return {
    ...state,
    matchCase: !matchCase,
  }
}
