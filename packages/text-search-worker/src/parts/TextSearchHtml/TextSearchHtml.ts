import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const textSearch = async (scheme: string, root: string, query: string): Promise<readonly SearchResult[]> => {
  return ParentRpc.invoke('ExtensionHostTextSearch.textSearchHtml', scheme, root, query)
}
