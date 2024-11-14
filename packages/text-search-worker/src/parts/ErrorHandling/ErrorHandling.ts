export const handleError = (error: any, notify = true, prefix = ''): void => {
  console.error(`[text-search-worker] ${error}`)
}
