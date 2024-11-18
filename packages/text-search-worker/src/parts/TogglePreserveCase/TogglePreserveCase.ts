import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'

export const togglePreserveCase = (state: SearchHeader): SearchHeader => {
  const { preserveCase } = state
  return {
    ...state,
    preserveCase: !preserveCase,
  }
}
