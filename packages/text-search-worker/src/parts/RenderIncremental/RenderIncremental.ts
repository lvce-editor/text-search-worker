import { diff } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import { renderItems } from '../RenderItems/RenderItems.ts'

// TODO cache rendered dom so that it can be used for dom diffing
export const renderIncremental = (oldState: SearchState, newState: SearchState): readonly any[] => {
  const oldDom = renderItems(oldState, oldState)
  const newDom = renderItems(newState, newState)
  const patches = diff(oldDom, newDom)
  return patches
}
