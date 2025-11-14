import type { SearchState } from '../SearchState/SearchState.ts'
import { removeIndex } from '../RemoveIndex/RemoveIndex.ts'

export const dismissItem = (state: SearchState): Promise<SearchState> => {
  const { listFocusedIndex } = state
  return removeIndex(state, listFocusedIndex)
}
