const windowsDrivePathRegex = /^\/[A-Za-z]:\//
const windowsDriveRegex = /^[A-Za-z]:[\\/]/
const uriSchemeRegex = /^[A-Za-z][A-Za-z\d+.-]*:/
const trailingSlashRegex = /\/$/

const normalizeWindowsDrive = (path: string): string => {
  return windowsDrivePathRegex.test(path) ? path.slice(1) : path
}

const toPath = (uri: string, expectedUrl?: URL): string => {
  if (windowsDriveRegex.test(uri)) {
    return uri.replaceAll('\\', '/')
  }
  if (URL.canParse(uri)) {
    const url = new URL(uri)
    if (expectedUrl && (url.protocol !== expectedUrl.protocol || url.host !== expectedUrl.host)) {
      return ''
    }
    if (url.protocol === 'file:' || expectedUrl) {
      return normalizeWindowsDrive(decodeURIComponent(url.pathname)).replaceAll('\\', '/')
    }
    return ''
  }
  if (uriSchemeRegex.test(uri)) {
    return ''
  }
  return uri.replaceAll('\\', '/')
}

export const getOpenEditorPaths = (root: string, openEditorUris: readonly string[]): readonly string[] => {
  const rootUrl = URL.canParse(root) ? new URL(root) : undefined
  const rootPath = toPath(root, rootUrl).replace(trailingSlashRegex, '')
  const rootPrefix = `${rootPath}/`
  const paths = openEditorUris
    .map((uri) => toPath(uri, rootUrl))
    .filter((path) => path.startsWith(rootPrefix))
    .map((path) => path.slice(rootPrefix.length))
  return [...new Set(paths)]
}
