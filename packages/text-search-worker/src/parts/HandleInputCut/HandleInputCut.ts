import type { SearchState } from '../SearchState/SearchState.ts'
import { getNewTextCut } from '../GetNewTextCut/GetNewTextCut.ts'
import { getCurrentValue, isSelectionKey } from '../HandleInputPaste/HandleInputPaste.ts'

export const handleInputCut = async (state: SearchState, name: string): Promise<SearchState> => {
  const { selections } = state
  if (!isSelectionKey(name, selections)) {
    return state
  }
  const selection = selections[name]
  const { start, end } = selection
  const currentText = getCurrentValue(state, name)
  // TODO get cut text
  const { newText } = getNewTextCut(currentText, start, end)
  if (newText) {
    return state
  }
  // TODO cut text
  return state
}
