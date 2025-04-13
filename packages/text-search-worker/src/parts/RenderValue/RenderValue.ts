import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderValue = (oldState: SearchState, newState: SearchState): readonly any[] => {
  return ['Viewlet.setValueByName', InputName.SearchValue, newState.value]
}

export const renderReplacement = (oldState: SearchState, newState: SearchState): readonly any[] => {
  return ['Viewlet.setValueByName', InputName.ReplaceValue, newState.replacement]
}

export const renderIncludeValue = (oldState: SearchState, newState: SearchState): readonly any[] => {
  return ['Viewlet.setValueByName', InputName.FilesToInclude, newState.includeValue]
}

export const renderExcludeValue = (oldState: SearchState, newState: SearchState): readonly any[] => {
  return ['Viewlet.setValueByName', InputName.FilesToExclude, newState.excludeValue]
}
