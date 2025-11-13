export const getFileName = (path: string): string => {
  const slashIndex = path.lastIndexOf('/')
  if (slashIndex === -1) {
    return ''
  }
  return path.slice(slashIndex + 1)
}
