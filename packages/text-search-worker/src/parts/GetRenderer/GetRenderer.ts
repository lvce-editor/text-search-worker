import type { Renderer } from '../Renderer/Renderer.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as InputName from '../InputName/InputName.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'

const renderFocus = (oldState: SearchState, newState: SearchState): boolean => {
  return oldState.focus === newState.focus || newState.focusSource === InputSource.User
}

const renderValue = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.value, `[name="${InputName.SearchValue}"]`]
}

const renderReplacement = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.replacement, `[name=${InputName.ReplaceValue}]`]
}

const renderIncludeValue = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.includeValue, `[name=${InputName.FilesToInclude}]`]
}

const renderExcludeValue = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.excludeValue, `[name=${InputName.FilesToExclude}]`]
}

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderValue:
      return renderValue
    case DiffType.RenderFocus:
      return renderFocus
    case DiffType.RenderReplaceValue:
      return renderReplacement
    case DiffType.RenderIncludeValue:
      return renderIncludeValue
    case DiffType.RenderExcludeValue:
      return renderExcludeValue
    case DiffType.RenderItems:
      return RenderItems.renderItems
    default:
      throw new Error('unknown renderer')
  }
}
