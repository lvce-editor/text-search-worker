import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'
import * as GetMatchCount from '../GetMatchCount/GetMatchCount.ts'
import * as GetTreeItemIndent from '../GetTreeItemIndent/GetTreeItemIndent.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getSearchDisplayResultFile = (
  results: readonly SearchResult[],
  fileIcons: readonly string[],
  i: number,
  ariaSetSize: number,
  collapsedPaths: readonly string[],
  text: string,
  posInSet: number,
  relativeIndex: number,
  isFocused: boolean,
  shouldRenderFolderPaths: boolean,
  originalResults: readonly SearchResult[],
): DisplaySearchResult => {
  const path = text
  const absolutePath = Workspace.getRelativePath(path)
  const baseName = Workspace.pathBaseName(path)
  const relativeFolderPath = Workspace.getRelativeFolderPath(path)
  const displayText = shouldRenderFolderPaths && relativeFolderPath ? `${baseName} — ${relativeFolderPath}` : baseName
  const index = originalResults.indexOf(results[i])
  const matchCount = GetMatchCount.getMatchCount(originalResults, index)
  const expanded = collapsedPaths.includes(path) ? ExpandedType.Collapsed : ExpandedType.Expanded
  const badgeText = String(matchCount)
  const depth = 0
  const indent = GetTreeItemIndent.getTreeItemIndent(depth)
  return {
    badgeText,
    depth,
    expanded,
    focused: isFocused,
    icon: fileIcons[relativeIndex],
    indent,
    matchLength: 0,
    matchStart: 0,
    posInSet,
    replacement: '',
    setSize: ariaSetSize,
    text: displayText,
    title: absolutePath,
  }
}
