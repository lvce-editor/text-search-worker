import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const textSearch = async (
  scheme: string,
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir: string,
): Promise<readonly SearchResult[]> => {
  return RendererWorker.invoke('ExtensionHostTextSearch.textSearchMemory', scheme, root, query, options, assetDir)
}
