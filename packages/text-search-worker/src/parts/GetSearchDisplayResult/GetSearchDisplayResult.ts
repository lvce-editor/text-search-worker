import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'
import * as GetMatchCount from '../GetMatchCount/GetMatchCount.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getDisplayResult = (
  results: readonly SearchResult[],
  fileIcons: readonly string[],
  i: number,
  setSize: number,
  searchTermLength: number,
  replacement: string,
  focusedIndex: number,
  collapsedPaths: readonly string[],
  minLineY: number,
): DisplaySearchResult => {
  const result = results[i]
  const { type, text, lineNumber, start } = result
  const posInSet = i + 1
  const focused = i === focusedIndex
  const relativeIndex = i - minLineY
  switch (type) {
    case TextSearchResultType.File:
      const path = text
      const absolutePath = Workspace.getAbsolutePath(path)
      const baseName = Workspace.pathBaseName(path)
      const matchCount = GetMatchCount.getMatchCount(results, i)
      return {
        title: absolutePath,
        text: baseName,
        icon: fileIcons[relativeIndex],
        posInSet,
        setSize,
        lineNumber,
        matchStart: 0,
        matchLength: 0,
        replacement: '',
        depth: 0,
        matchCount,
        focused,
        expanded: collapsedPaths.includes(path) ? ExpandedType.Collapsed : ExpandedType.Expanded,
      }
    case TextSearchResultType.Match:
      return {
        title: text,
        text: text,
        icon: '',
        posInSet,
        setSize,
        lineNumber,
        matchStart: start,
        matchLength: searchTermLength,
        replacement,
        depth: 1,
        matchCount: 0,
        focused,
        expanded: ExpandedType.None,
      }
    default:
      throw new Error('unexpected search result type')
  }
}
