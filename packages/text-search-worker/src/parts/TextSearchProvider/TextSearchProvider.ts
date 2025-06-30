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

export const getProvider = (scheme: string): TextSearchProvider => {
  switch (scheme) {
    case '':
      return TextSearchNode.textSearch
    case 'web':
      return TextSearchWeb.textSearch
    case 'fetch':
      return TextSearchFetch.textSearch
    case 'html':
      return TextSearchHtml.textSearch
    case 'memfs':
      return TextSearchMemory.textSearch
    default:
      return TextSearchExtension.textSearch
  }
}
