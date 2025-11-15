import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RenderFocus from '../RenderFocus/RenderFocus.ts'
import * as RenderFocusContext from '../RenderFocusContext/RenderFocusContext.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'
import { renderSelections } from '../RenderSelections/RenderSelections.ts'
import * as RenderValue from '../RenderValue/RenderValue.ts'

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderValue:
      return RenderValue.renderValue
    case DiffType.RenderFocus:
      return RenderFocus.renderFocus
    case DiffType.RenderReplaceValue:
      return RenderValue.renderReplacement
    case DiffType.RenderIncludeValue:
      return RenderValue.renderIncludeValue
    case DiffType.RenderExcludeValue:
      return RenderValue.renderExcludeValue
    case DiffType.RenderItems:
      return RenderItems.renderItems
    case DiffType.RenderFocusContext:
      return RenderFocusContext.renderFocusContext
    case DiffType.RenderSelections:
      return renderSelections
    default:
      throw new Error('unknown renderer')
  }
}
