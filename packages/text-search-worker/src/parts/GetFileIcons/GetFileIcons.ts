import * as GetFiles from '../GetFiles/GetFiles.ts'
import * as Rpc from '../ParentRpc/ParentRpc.ts'

const getFileIcon = (file: any): Promise<string> => {
  return Rpc.invoke('IconTheme.getFileIcon', { name: file.text })
}

export const getFileIcons = async (matches: readonly any[]): Promise<readonly string[]> => {
  // TODO cache file icons
  const files = GetFiles.getFiles(matches)
  const promises = files.map(getFileIcon)
  const icons = await Promise.all(promises)
  return icons
}
