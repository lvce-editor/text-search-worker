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
    badgeText: '',
    childCount: GetSearchDisplayResultChildCount.getChildCount(ExpandedType.None, 0),
    depth: 1,
    expanded: ExpandedType.None,
    focused,
    icon: '',
    lineNumber,
    matchLength: searchTermLength,
    matchStart: start,
    posInSet,
    replacement,
    setSize,
    text: text,
    title: text,
  }
}
