import * as GetIcon from '../GetIcon/GetIcon.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'
import * as Workspace from '../Workspace/Workspace.ts'

export const getDisplayResult = (
  result: SearchResult,
  itemHeight: number,
  i: number,
  setSize: number,
  searchTermLength: number,
  replacement: string,
  focusedIndex: number,
) => {
  const { type, text, lineNumber, start } = result
  const posInSet = i + 1
  const top = i * itemHeight
  const focused = i === focusedIndex
  switch (type) {
    case TextSearchResultType.File:
      const path = text
      const absolutePath = Workspace.getAbsolutePath(path)
      const baseName = Workspace.pathBaseName(path)
      return {
        title: absolutePath,
        type: TextSearchResultType.File,
        text: baseName,
        icon: GetIcon.getFileIcon(),
        posInSet,
        setSize,
        top,
        lineNumber,
        matchStart: 0,
        matchLength: 0,
        replacement: '',
        depth: 0,
        matchCount: 0,
        focused,
      }
    case TextSearchResultType.Match:
      return {
        title: text,
        type: TextSearchResultType.Match,
        text: text,
        icon: '',
        posInSet,
        setSize,
        top,
        lineNumber,
        matchStart: start,
        matchLength: searchTermLength,
        replacement,
        depth: 1,
        matchCount: 0,
        focused,
      }
    default:
      throw new Error('unexpected search result type')
  }
}
