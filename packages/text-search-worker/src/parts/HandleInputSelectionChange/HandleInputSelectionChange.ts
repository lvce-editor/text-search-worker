import type { SearchState } from '../SearchState/SearchState.ts'

export const handleInputSelectionChange = async (
  state: SearchState,
  name: string,
  selectionStart: number,
  selectionEnd: number,
): Promise<SearchState> => {
  const { selections } = state
  return {
    ...state,
    selections: {
      ...selections,
      [name]: {
        selectionStart,
        selectionEnd,
      },
    },
  }
}
