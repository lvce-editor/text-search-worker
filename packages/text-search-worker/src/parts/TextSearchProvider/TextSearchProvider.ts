import * as TextSearchExtension from '../TextSearchExtension/TextSearchExtension.ts'
import * as TextSearchFetch from '../TextSearchFetch/TextSearchFetch.ts'
import * as TextSearchHtml from '../TextSearchHtml/TextSearchHtml.ts'
import * as TextSearchNode from '../TextSearchNode/TextSearchNode.ts'
import * as TextSearchWeb from '../TextSearchWeb/TextSearchWeb.ts'

export const getProvider = (scheme: string): any => {
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
