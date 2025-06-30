import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchExtension from '../TextSearchExtension/TextSearchExtension.ts'
import * as TextSearchFetch from '../TextSearchFetch/TextSearchFetch.ts'
import * as TextSearchHtml from '../TextSearchHtml/TextSearchHtml.ts'
import * as TextSearchMemory from '../TextSearchMemory/TextSearchMemory.ts'
import * as TextSearchNode from '../TextSearchNode/TextSearchNode.ts'
import * as TextSearchWeb from '../TextSearchWeb/TextSearchWeb.ts'

export interface TextSearchProvider {
  (scheme: string, root: string, query: string, options: any, assetDir: string, platform?: number): Promise<readonly SearchResult[]>
}

export const textSearchProviderMap: Record<string, TextSearchProvider> = {
  '': TextSearchNode.textSearch,
  web: TextSearchWeb.textSearch,
  fetch: TextSearchFetch.textSearch,
  html: TextSearchHtml.textSearch,
  memfs: TextSearchMemory.textSearch,
  default: TextSearchExtension.textSearch,
}
