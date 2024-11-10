// TODO this should be in FileSystem module
export const pathBaseName = (path: string): string => {
  return path.slice(path.lastIndexOf('/') + 1)
}

export const getAbsolutePath = (relativePath: string): string => {
  if (relativePath.startsWith('./')) {
    return `/${relativePath.slice(2)}` // TODO support windows paths
  }
  return `/${relativePath}` // TODO support windows paths
}
