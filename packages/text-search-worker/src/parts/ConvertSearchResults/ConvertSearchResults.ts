import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { SearchResultFile } from '../SearchResultFile/SearchResultFile.ts'
import type { SearchResultMatch } from '../SearchResultMatch/SearchResultMatch.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const convertSearchResults = (results: readonly SearchResult[]): readonly SearchResultFile[] => {
  const files: SearchResultFile[] = []
  let matches: SearchResultMatch[] = []
  for (const result of results) {
    if (result.type === TextSearchResultType.File) {
      matches = []
      const currentFile = {
        path: result.text,
        matches,
        isExpanded: true,
      }
      files.push(currentFile)
    } else if (result.type === TextSearchResultType.Match) {
      matches.push({
        text: result.text,
        start: result.start,
        end: result.end,
        lineNumber: result.lineNumber,
      })
    }
  }
  return files
}
