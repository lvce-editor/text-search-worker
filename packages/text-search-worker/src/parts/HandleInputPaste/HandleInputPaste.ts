import { InputSource } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import type { SelectionState } from '../SelectionState/SelectionState.ts'
import { readText } from '../ClipBoard/ClipBoard.ts'
import { getNewText } from '../GetNewText/GetNewText.ts'
import * as InputName from '../InputName/InputName.ts'

export const isSelectionKey = (name: string, selections: SelectionState): name is keyof SelectionState => {
  return name in selections
}

export const getCurrentValue = (state: SearchState, name: string): string => {
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

export const updateValue = (state: SearchState, name: string, newValue: string): SearchState => {
  switch (name) {
    case InputName.SearchValue:
      return {
        ...state,
        value: newValue,
        inputSource: InputSource.Script,
      }
    case InputName.ReplaceValue:
      return {
        ...state,
        replacement: newValue,
        inputSource: InputSource.Script,
      }
    case InputName.FilesToInclude:
      return {
        ...state,
        includeValue: newValue,
        inputSource: InputSource.Script,
      }
    case InputName.FilesToExclude:
      return {
        ...state,
        excludeValue: newValue,
        inputSource: InputSource.Script,
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
  return updateValue(state, name, newText)
}
