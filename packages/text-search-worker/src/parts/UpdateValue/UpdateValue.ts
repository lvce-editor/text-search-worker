import { InputSource } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputName from '../InputName/InputName.ts'

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
