import type { SearchResult } from '../SearchResult/SearchResult.ts'

export const textSearch = async (scheme: string, root: string, query: string): Promise<readonly SearchResult[]> => {
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
