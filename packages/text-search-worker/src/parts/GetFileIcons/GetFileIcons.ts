import * as Rpc from '../Rpc/Rpc.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getFileIcons = async (files: readonly any[]): Promise<readonly string[]> => {
  // TODO cache file icons
  const promises = []
  for (const file of files) {
    if (file.type === TextSearchResultType.Match) {
      continue
    }
    promises.push(Rpc.invoke('IconTheme.getFileIcon', { name: file.text }))
  }
  const icons = await Promise.all(promises)
  return icons
}
