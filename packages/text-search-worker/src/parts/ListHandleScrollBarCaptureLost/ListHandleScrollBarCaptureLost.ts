import type { SearchState } from '../SearchState/SearchState.ts'

export const handleScrollBarCaptureLost = (state: SearchState): SearchState => {
  return {
    ...state,
    scrollBarActive: false,
  }
}
