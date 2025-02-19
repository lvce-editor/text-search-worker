import type { Renderer } from '../Renderer/Renderer.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'
import * as RenderValue from '../RenderValue/RenderValue.ts'

const renderFocus = (oldState: SearchState, newState: SearchState): boolean => {
  return oldState.focus === newState.focus || newState.focusSource === InputSource.User
}

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderValue:
      return RenderValue.renderValue
    case DiffType.RenderFocus:
      return renderFocus
    case DiffType.RenderReplaceValue:
      return RenderValue.renderReplacement
    case DiffType.RenderIncludeValue:
      return RenderValue.renderIncludeValue
    case DiffType.RenderExcludeValue:
      return RenderValue.renderExcludeValue
    case DiffType.RenderItems:
      return RenderItems.renderItems
    default:
      throw new Error('unknown renderer')
  }
}
