import type { SearchState } from '../SearchState/SearchState.ts'
import type { SelectionState } from '../SelectionState/SelectionState.ts'
import { getNewText } from '../GetNewText/GetNewText.ts'

const isSelectionKey = (name: string, selections: SelectionState): name is keyof SelectionState => {
  return name in selections
}

export const handleInputPaste = async (state: SearchState, name: string): Promise<SearchState> => {
  const { selections } = state
  if (!isSelectionKey(name, selections)) {
    return state
  }
  const selection = selections[name]
  const { start, end } = selection
  const currentText = ''
  const insertedText = ''
  const newText = getNewText(currentText, start, end, insertedText)
  if (newText) {
    return state
  }
  // TODO paste text
  return state
}
