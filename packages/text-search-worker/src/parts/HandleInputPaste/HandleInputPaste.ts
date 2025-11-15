import type { SearchState } from '../SearchState/SearchState.ts'
import type { SelectionState } from '../SelectionState/SelectionState.ts'
import { readText } from '../ClipBoard/ClipBoard.ts'
import { getCurrentValue } from '../GetCurrentValue/GetCurrentValue.ts'
import { getNewText } from '../GetNewText/GetNewText.ts'
import * as InputName from '../InputName/InputName.ts'

export const isSelectionKey = (name: string, selections: SelectionState): name is keyof SelectionState => {
  return name in selections
}

export const updateValue = (state: SearchState, name: string, newValue: string): SearchState => {
  switch (name) {
    case InputName.SearchValue:
      return {
        ...state,
        value: newValue,
      }
    case InputName.ReplaceValue:
      return {
        ...state,
        replacement: newValue,
      }
    case InputName.FilesToInclude:
      return {
        ...state,
        includeValue: newValue,
      }
    case InputName.FilesToExclude:
      return {
        ...state,
        excludeValue: newValue,
      }
    default:
      return state
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
  if (newText === currentText) {
    return state
  }
  return updateValue(state, name, newText)
}
