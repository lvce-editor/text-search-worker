import type { SearchState } from '../SearchState/SearchState.ts'
import type { SelectionState } from '../SelectionState/SelectionState.ts'
import { readText } from '../ClipBoard/ClipBoard.ts'
import { getNewText } from '../GetNewText/GetNewText.ts'
import * as InputName from '../InputName/InputName.ts'

const isSelectionKey = (name: string, selections: SelectionState): name is keyof SelectionState => {
  return name in selections
}

const getCurrentValue = (state: SearchState, name: string): string => {
  switch (name) {
    case InputName.SearchValue:
      return state.value
    case InputName.FilesToExclude:
      return state.excludeValue
    case InputName.FilesToInclude:
      return state.includeValue
    case InputName.ReplaceValue:
      return state.replacement
    default:
      return ''
  }
}
export const handleInputPaste = async (state: SearchState, name: string): Promise<SearchState> => {
  const { selections } = state
  if (!isSelectionKey(name, selections)) {
    return state
  }
  const selection = selections[name]
  const { start, end } = selection
  const currentText = getCurrentValue(state, name)
  const insertedText = await readText()
  const newText = getNewText(currentText, start, end, insertedText)
  if (newText) {
    return state
  }
  // TODO paste text
  return state
}
