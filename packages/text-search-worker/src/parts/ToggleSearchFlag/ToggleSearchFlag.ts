import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'

export const toggleSearchFlag = (state: SearchHeader, flag: number): SearchHeader => {
  return {
    ...state,
    flags: state.flags ^ flag,
  }
}
