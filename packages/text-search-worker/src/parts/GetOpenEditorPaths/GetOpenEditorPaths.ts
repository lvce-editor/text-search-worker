const normalizeWindowsDrive = (path: string): string => {
  return /^\/[A-Za-z]:\//.test(path) ? path.slice(1) : path
}

const toPath = (uri: string): string => {
  if (uri.startsWith('file://')) {
    return normalizeWindowsDrive(decodeURIComponent(new URL(uri).pathname)).replaceAll('\\', '/')
  }
  if (/^[A-Za-z]:[\\/]/.test(uri)) {
    return uri.replaceAll('\\', '/')
  }
  if (/^[A-Za-z][A-Za-z\d+.-]*:/.test(uri)) {
    return ''
  }
  return uri.replaceAll('\\', '/')
}

export const getOpenEditorPaths = (root: string, openEditorUris: readonly string[]): readonly string[] => {
  const rootPath = toPath(root).replace(/\/$/, '')
  const rootPrefix = `${rootPath}/`
  const paths = openEditorUris
    .map(toPath)
    .filter((path) => path.startsWith(rootPrefix))
    .map((path) => path.slice(rootPrefix.length))
  return [...new Set(paths)]
}
