import type { SearchState } from '../SearchState/SearchState.ts'
import { getNewText } from '../GetNewText/GetNewText.ts'
import { isSelectionKey, getCurrentValue } from '../HandleInputPaste/HandleInputPaste.ts'

export const handleInputCut = async (state: SearchState, name: string): Promise<SearchState> => {
  const { selections } = state
  if (!isSelectionKey(name, selections)) {
    return state
  }
  const selection = selections[name]
  const { start, end } = selection
  const currentText = getCurrentValue(state, name)
  const insertedText = ''
  // TODO get cut text
  const newText = getNewText(currentText, start, end, insertedText)
  if (newText) {
    return state
  }
  // TODO cut text
  return state
}
