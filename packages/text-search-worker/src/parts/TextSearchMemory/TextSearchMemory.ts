import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const textSearch = async (scheme: string, root: string, query: string, options: any, assetDir: string): Promise<readonly SearchResult[]> => {
  return ParentRpc.invoke('ExtensionHostTextSearch.textSearchMemory', scheme, root, query, options, assetDir)
}
