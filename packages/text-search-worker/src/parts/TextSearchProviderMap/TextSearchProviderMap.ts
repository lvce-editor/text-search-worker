import type { TextSearchProvider } from '../TextSearchProvider/TextSearchProvider.ts'
import * as TextSearchExtension from '../TextSearchExtension/TextSearchExtension.ts'
import * as TextSearchFetch from '../TextSearchFetch/TextSearchFetch.ts'
import * as TextSearchHtml from '../TextSearchHtml/TextSearchHtml.ts'
import * as TextSearchMemory from '../TextSearchMemory/TextSearchMemory.ts'
import * as TextSearchNode from '../TextSearchNode/TextSearchNode.ts'
import * as TextSearchWeb from '../TextSearchWeb/TextSearchWeb.ts'

export const textSearchProviderMap: Record<string, TextSearchProvider> = {
  '': TextSearchNode.textSearch,
  web: TextSearchWeb.textSearch,
  fetch: TextSearchFetch.textSearch,
  html: TextSearchHtml.textSearch,
  memfs: TextSearchMemory.textSearch,
  default: TextSearchExtension.textSearch,
}
