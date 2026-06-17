import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import * as GetSearchDisplayResultFile from '../GetSearchDisplayResultFile/GetSearchDisplayResultFile.ts'
import * as GetSearchDisplayResultMatch from '../GetSearchDisplayResultMatch/GetSearchDisplayResultMatch.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

export const getDisplayResult = (
  results: readonly SearchResult[],
  fileIcons: readonly string[],
  i: number,
  ariaSetSize: number,
  searchTermLength: number,
  replacement: string,
  focusedIndex: number,
  collapsedPaths: readonly string[],
  shouldRenderFolderPaths: boolean,
  minLineY: number,
  originalResults: readonly SearchResult[],
): DisplaySearchResult => {
  const result = results[i]
  const { start, text, type } = result
  const posInSet = i + 1
  const isFocused = i === focusedIndex
  const relativeIndex = i - minLineY
  switch (type) {
    case TextSearchResultType.File:
      return GetSearchDisplayResultFile.getSearchDisplayResultFile(
        results,
        fileIcons,
        i,
        ariaSetSize,
        collapsedPaths,
        text,
        posInSet,
        relativeIndex,
        isFocused,
        shouldRenderFolderPaths,
        originalResults,
      )
    case TextSearchResultType.Match:
      return GetSearchDisplayResultMatch.getDisplayResultMatch(ariaSetSize, searchTermLength, replacement, text, posInSet, start, isFocused)
    default:
      throw new Error('unexpected search result type')
  }
}
