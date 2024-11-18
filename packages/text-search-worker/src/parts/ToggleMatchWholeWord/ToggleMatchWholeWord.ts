import type { SearchState } from '../SearchState/SearchState.ts'

export const toggleMatchWholeWord = (state: SearchState): SearchState => {
  const { matchWholeWord } = state
  return {
    ...state,
    matchWholeWord: !matchWholeWord,
  }
}
