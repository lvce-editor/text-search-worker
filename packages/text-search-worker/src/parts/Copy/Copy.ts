import type { SearchState } from '../SearchState/SearchState.ts'
import * as Rpc from '../RendererWorker/RendererWorker.ts'

export const copy = async (state: SearchState): Promise<SearchState> => {
  const { items, listFocusedIndex } = state
  if (listFocusedIndex === -1) {
    return state
  }
  const item = items[listFocusedIndex]
  await Rpc.invoke('ClipBoard.writeText', item.text)
  return state
}
