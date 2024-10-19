import * as TextSearchExtension from '../TextSearch/TextSearchExtension.ts'
import * as TextSearchFetch from '../TextSearch/TextSearchFetch.ts'
import * as TextSearchHtml from '../TextSearch/TextSearchHtml.ts'
import * as TextSearchNode from '../TextSearch/TextSearchNode.ts'
import * as TextSearchWeb from '../TextSearch/TextSearchWeb.ts'

export const getProvider = (scheme: string) => {
  switch (scheme) {
    case '':
      return TextSearchNode.textSearch
    case 'web':
      return TextSearchWeb.textSearch
    case 'fetch':
      return TextSearchFetch.textSearch
    case 'html':
      return TextSearchHtml.textSearch
    default:
      return TextSearchExtension.textSearch
  }
}
