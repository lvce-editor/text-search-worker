import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'

export const getDisplayResultMatch = (
  setSize: number,
  searchTermLength: number,
  replacement: string,
  text: string,
  posInSet: number,
  start: number,
  focused: boolean,
): DisplaySearchResult => {
  return {
    badgeText: '',
    depth: 1,
    expanded: ExpandedType.None,
    focused,
    icon: '',
    matchLength: searchTermLength,
    matchStart: start,
    posInSet,
    replacement,
    setSize,
    text: text,
    title: text.trim(),
  }
}
