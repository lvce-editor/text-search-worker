const dirname = (pathSeparator: string, path: string): string => {
  const index = path.lastIndexOf(pathSeparator)
  if (index === -1) {
    return path
  }
  return path.slice(0, index)
}

export const dirname2 = (path: string): string => {
  return dirname('/', path)
}

export const join2 = (path: string, childPath: string): string => {
  if (path.endsWith('/')) {
    return `${path}${childPath}`
  }
  return `${path}/${childPath}`
}
