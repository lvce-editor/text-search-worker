import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export const textSearch = async (
  scheme: string,
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir: string,
): Promise<readonly SearchResult[]> => {
  return ParentRpc.invoke('ExtensionHostTextSearch.textSearchFetch', scheme, root, query, options, assetDir)
}
