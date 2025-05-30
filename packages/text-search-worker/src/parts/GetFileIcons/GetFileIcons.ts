import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as Rpc from '../ParentRpc/ParentRpc.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const getFileIcon = async (result: SearchResult): Promise<string> => {
  if (result.type === TextSearchResultType.File) {
    return Rpc.invoke('IconTheme.getFileIcon', { name: result.text })
  }
  return ''
}

export const getFileIcons = async (matches: readonly SearchResult[]): Promise<readonly string[]> => {
  // TODO cache file icons
  const promises = matches.map(getFileIcon)
  const icons = await Promise.all(promises)
  return icons
}
