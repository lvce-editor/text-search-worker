import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { TextSearchProvider } from '../TextSearchProvider/TextSearchProvider.ts'
import * as TextSearchProviders from '../TextSearchProviders/TextSearchProviders.ts'

export const getTextSearchProvider = (scheme: string): TextSearchProvider => {
  return TextSearchProviders.get(scheme)
}
