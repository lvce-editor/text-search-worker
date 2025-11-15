import { InputSource } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import type { SelectionState } from '../SelectionState/SelectionState.ts'
import * as InputName from '../InputName/InputName.ts'

const getNewSelections = (selections: SelectionState, name: string, newValue: string): SelectionState => {
  const old = selections[name as keyof SelectionState]
  if (!old) {
    return selections
  }
  const { start, end } = old
  const newSelection = newValue.length
  if (start === newSelection && end === newSelection) {
    return selections
  }
  return {
    ...selections,
    [name]: {
      start: newSelection,
      end: newSelection,
    },
  }
}

export const updateValue = (state: SearchState, name: string, newValue: string): SearchState => {
  const { selections } = state
  const newSelections = getNewSelections(selections, name, newValue)
  switch (name) {
    case InputName.SearchValue:
      return {
        ...state,
        value: newValue,
        inputSource: InputSource.Script,
        selections: newSelections,
      }
    case InputName.ReplaceValue:
      return {
        ...state,
        replacement: newValue,
        inputSource: InputSource.Script,
        selections: newSelections,
      }
    case InputName.FilesToInclude:
      return {
        ...state,
        includeValue: newValue,
        inputSource: InputSource.Script,
        selections: newSelections,
      }
    case InputName.FilesToExclude:
      return {
        ...state,
        excludeValue: newValue,
        inputSource: InputSource.Script,
        selections: newSelections,
      }
    default:
      return state
  }
}
