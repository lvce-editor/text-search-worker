import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'

export const toggleMatchCase = (state: SearchHeader): SearchHeader => {
  const { matchCase } = state
  return {
    ...state,
    matchCase: !matchCase,
  }
}
