import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputName from '../InputName/InputName.ts'

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
