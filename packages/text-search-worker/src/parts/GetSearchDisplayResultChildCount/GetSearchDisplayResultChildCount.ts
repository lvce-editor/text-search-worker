import * as ExpandedType from '../ExpandedType/ExpandedType.ts'

export const getChildCount = (expanded: number, matchCount: number): number => {
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
