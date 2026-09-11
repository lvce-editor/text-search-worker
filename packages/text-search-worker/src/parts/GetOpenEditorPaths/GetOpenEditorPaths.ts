const windowsDrivePathRegex = /^\/[A-Za-z]:\//
const windowsDriveRegex = /^[A-Za-z]:[\\/]/
const uriSchemeRegex = /^[A-Za-z][A-Za-z\d+.-]*:/
const trailingSlashRegex = /\/$/

const normalizeWindowsDrive = (path: string): string => {
  return windowsDrivePathRegex.test(path) ? path.slice(1) : path
}

const toPath = (uri: string): string => {
  if (uri.startsWith('file://')) {
    return normalizeWindowsDrive(decodeURIComponent(new URL(uri).pathname)).replaceAll('\\', '/')
  }
  if (windowsDriveRegex.test(uri)) {
    return uri.replaceAll('\\', '/')
  }
  if (uriSchemeRegex.test(uri)) {
    return ''
  }
  return uri.replaceAll('\\', '/')
}

export const getOpenEditorPaths = (root: string, openEditorUris: readonly string[]): readonly string[] => {
  const rootPath = toPath(root).replace(trailingSlashRegex, '')
  const rootPrefix = `${rootPath}/`
  const paths = openEditorUris
    .map(toPath)
    .filter((path) => path.startsWith(rootPrefix))
    .map((path) => path.slice(rootPrefix.length))
  return [...new Set(paths)]
}
