import type { SearchState } from '../SearchState/SearchState.ts'
import { openUri } from '../OpenUri/OpenUri.ts'

let searchEditorId = 0

export const openSearchEditor = async (state: SearchState): Promise<SearchState> => {
  const uri = `search-editor://${state.uid}-${++searchEditorId}/Search`
  await openUri(uri)
  return state
}
