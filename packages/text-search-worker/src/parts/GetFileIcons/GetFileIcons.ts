import * as Rpc from '../Rpc/Rpc.ts'

export const getFileIcons = async (files: readonly string[]) => {
  const promises = []
  for (const file of files) {
    promises.push(Rpc.invoke('IconTheme.getFileIcon', file))
  }
  const icons = await Promise.all(promises)
  return icons
}
