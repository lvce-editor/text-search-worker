import type { SearchState } from '../SearchState/SearchState.ts'
import * as InputName from '../InputName/InputName.ts'

export const renderValue = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.value, `[name="${InputName.SearchValue}"]`]
}

export const renderReplacement = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.replacement, `[name=${InputName.ReplaceValue}]`]
}

export const renderIncludeValue = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.includeValue, `[name=${InputName.FilesToInclude}]`]
}

export const renderExcludeValue = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.excludeValue, `[name=${InputName.FilesToExclude}]`]
}
