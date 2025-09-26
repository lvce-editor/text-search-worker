import type { SearchState } from '../SearchState/SearchState.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const copy = async (state: SearchState): Promise<SearchState> => {
  const { items, focusedIndex } = state
  if (focusedIndex === -1) {
    return state
  }
  const item = items[focusedIndex]
  await RendererWorker.writeClipBoardText(item.text)
  return state
}
