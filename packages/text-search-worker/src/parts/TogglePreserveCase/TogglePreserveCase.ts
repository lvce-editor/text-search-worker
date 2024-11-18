import type { SearchState } from '../SearchState/SearchState.ts'

export const togglePreserveCase = (state: SearchState): SearchState => {
  const { preserveCase } = state
  return {
    ...state,
    preserveCase: !preserveCase,
  }
}
