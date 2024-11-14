export const textSearch = (scheme: string, root: string, query: string) :any=> {
  // TODO ask renderer worker for files
  const entries = Object.entries({})
  const results: any[] = []
  for (const [key, value] of entries) {
    // @ts-ignore
    if (value.includes(query)) {
      results.push([
        key,
        [
          {
            absoluteOffset: 0,
            preview: value,
          },
        ],
      ])
    }
  }
  return results
}
