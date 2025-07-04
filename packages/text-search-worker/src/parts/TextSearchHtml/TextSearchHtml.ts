import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const textSearch = async (scheme: string, root: string, query: string): Promise<readonly SearchResult[]> => {
  return RendererWorker.invoke('ExtensionHostTextSearch.textSearchHtml', scheme, root, query)
}
