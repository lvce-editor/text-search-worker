import type { BulkReplacementEdits } from '../BulkReplacementEdits/BulkReplacementEdits.ts'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import * as Arrays from '../Arrays/Arrays.ts'
import * as Assert from '../Assert/Assert.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'
import { SearchResult } from '../SearchResult/SearchResult.ts'

const getFileName = (text: string): string => {
  // TODO make api stricter so that results always have the same shape
  if (text.startsWith('./')) {
    return text.slice(2)
  }
  return text
}

export const getBulkReplacementEdits = (workspacePath: string, matches: readonly SearchResult[]): BulkReplacementEdits => {
  Assert.string(workspacePath)
  Assert.array(matches)
  const files: string[] = []
  const ranges: number[] = []
  let currentRanges: number[] = []
  for (const match of matches) {
    const { type, text } = match
    switch (type) {
      case TextSearchResultType.File:
        ranges.push(currentRanges.length)
        Arrays.push(ranges, currentRanges)
        const fileName = getFileName(text)
        const absolutePath = `${workspacePath}/${fileName}`
        files.push(absolutePath)
        currentRanges = []
        break
      case TextSearchResultType.Match:
        currentRanges.push(match.lineNumber - 1, match.start, match.lineNumber - 1, match.start + match.l)
        break
      default:
        break
    }
  }
  console.log({ ranges, matches })
  ranges.push(currentRanges.length)
  Arrays.push(ranges, currentRanges)
  return {
    files,
    ranges: ranges.slice(1),
  }
}
