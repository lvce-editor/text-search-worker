import type { SearchState } from '../SearchState/SearchState.ts'
import { openUri } from '../OpenUri/OpenUri.ts'

export const openSearchEditor = async (state: SearchState): Promise<SearchState> => {
  const uri = `search-editor://${state.uid}-${globalThis.crypto.randomUUID()}/Search`
  await openUri(uri)
  return state
}
