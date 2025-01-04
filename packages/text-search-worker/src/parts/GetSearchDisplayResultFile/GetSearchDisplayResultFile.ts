import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'
import * as GetMatchCount from '../GetMatchCount/GetMatchCount.ts'
import * as GetSearchDisplayResultChildCount from '../GetSearchDisplayResultChildCount/GetSearchDisplayResultChildCount.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getSearchDisplayResultFile = (
  results: readonly SearchResult[],
  fileIcons: readonly string[],
  i: number,
  setSize: number,
  collapsedPaths: readonly string[],
  text: string,
  posInSet: number,
  relativeIndex: number,
  lineNumber: number,
  focused: boolean,
): DisplaySearchResult => {
  const path = text
  const absolutePath = Workspace.getAbsolutePath(path)
  const baseName = Workspace.pathBaseName(path)
  const matchCount = GetMatchCount.getMatchCount(results, i)
  const expanded = collapsedPaths.includes(path) ? ExpandedType.Collapsed : ExpandedType.Expanded
  const childCount = GetSearchDisplayResultChildCount.getChildCount(expanded, matchCount)
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
}
