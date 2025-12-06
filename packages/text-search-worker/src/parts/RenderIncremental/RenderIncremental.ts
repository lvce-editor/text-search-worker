import { diff } from '@lvce-editor/virtual-dom-worker'
import { renderItems } from '../RenderItems/RenderItems.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

// TODO cache rendered dom so that it can be used for dom diffing
export const renderIncremental = (uid: number): readonly any[] => {
  const { newState, oldState } = SearchViewStates.get(uid)
  const oldDom = renderItems(oldState, oldState)
  const newDom = renderItems(newState, newState)
  const patches = diff(oldDom, newDom)
  return patches
}
