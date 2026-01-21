import { diff } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import { renderItems } from '../RenderItems/RenderItems.ts'

// TODO cache rendered dom so that it can be used for dom diffing
export const renderIncremental = (oldState: SearchState, newState: SearchState): readonly any[] => {
  const oldDom = renderItems(oldState, oldState)[2]
  const newDom = renderItems(newState, newState)[2]
  const patches = diff(oldDom, newDom)
  console.log({ newDom, oldDom })
  return ['Viewlet.setPatches', newState.uid, patches]
}
