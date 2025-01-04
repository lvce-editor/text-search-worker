import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'
import * as GetSearchDisplayResultChildCount from '../GetSearchDisplayResultChildCount/GetSearchDisplayResultChildCount.ts'

export const getDisplayResultMatch = (
  setSize: number,
  searchTermLength: number,
  replacement: string,
  text: string,
  posInSet: number,
  lineNumber: number,
  start: number,
  focused: boolean,
): DisplaySearchResult => {
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
    childCount: GetSearchDisplayResultChildCount.getChildCount(ExpandedType.None, 0),
  }
}
