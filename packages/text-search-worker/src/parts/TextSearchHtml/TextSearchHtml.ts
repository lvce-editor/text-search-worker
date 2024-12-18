import * as ParentRpc from '../ParentRpc/ParentRpc.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'

export const textSearch = async (scheme: string, root: string, query: string): Promise<readonly SearchResult[]> => {
  return ParentRpc.invoke('ExtensionHostTextSearch.textSearchHtml', scheme, root, query)
}
