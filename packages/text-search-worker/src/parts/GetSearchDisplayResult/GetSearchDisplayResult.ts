import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'
import * as GetMatchCount from '../GetMatchCount/GetMatchCount.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'
import * as Workspace from '../Workspace/Workspace.ts'

const getChildCount = (expanded: number, matchCount: number): number => {
  let childCount = 1
  if (expanded === ExpandedType.Expanded || expanded === ExpandedType.Collapsed) {
    childCount += 2
  }
  if (matchCount) {
    childCount++
  }
  childCount++
  return childCount
}

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
      const expanded = collapsedPaths.includes(path) ? ExpandedType.Collapsed : ExpandedType.Expanded
      const childCount = getChildCount(expanded, matchCount)
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
        expanded,
        childCount,
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
        childCount: getChildCount(ExpandedType.None, 0),
      }
    default:
      throw new Error('unexpected search result type')
  }
}
