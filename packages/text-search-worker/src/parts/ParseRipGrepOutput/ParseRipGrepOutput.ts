import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const parseRipGrepOutput = (chunk: Buffer): readonly SearchResult[] => {
  const lines = chunk.toString().split('\n')
  const results: SearchResult[] = []
  let currentFile = ''

  for (const line of lines) {
    if (!line) continue

    try {
      const data = JSON.parse(line)
      if (data.type === 'begin') {
        currentFile = data.data.path.text
        results.push({
          type: TextSearchResultType.File,
          text: currentFile,
          start: 0,
          end: 0,
          lineNumber: 0,
        })
      } else if (data.type === 'match') {
        results.push({
          type: TextSearchResultType.Match,
          text: data.data.lines.text,
          start: data.data.submatches[0].start,
          end: data.data.submatches[0].end,
          lineNumber: data.data.line_number,
        })
      }
    } catch (error) {
      // Skip invalid JSON lines
      continue
    }
  }

  return results
}
