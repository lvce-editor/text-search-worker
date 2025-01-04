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
  focused: boolean,
): DisplaySearchResult => {
  const path = text
  const absolutePath = Workspace.getAbsolutePath(path)
  const baseName = Workspace.pathBaseName(path)
  const matchCount = GetMatchCount.getMatchCount(results, i)
  const expanded = collapsedPaths.includes(path) ? ExpandedType.Collapsed : ExpandedType.Expanded
  const childCount = GetSearchDisplayResultChildCount.getChildCount(expanded, matchCount)
  const badgeText = `${matchCount}`
  return {
    badgeText,
    childCount,
    depth: 0,
    expanded,
    focused,
    icon: fileIcons[relativeIndex],
    matchLength: 0,
    matchStart: 0,
    posInSet,
    replacement: '',
    setSize,
    text: baseName,
    title: absolutePath,
  }
}
