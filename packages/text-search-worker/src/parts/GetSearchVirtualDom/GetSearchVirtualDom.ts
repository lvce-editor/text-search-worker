import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSearchHeaderVirtualDom from '../GetSearchHeaderVirtualDom/GetSearchHeaderVirtualDom.ts'
import * as GetSearchInputErrorVirtualDom from '../GetSearchInputErrorVirtualDom/GetSearchInputErrorVirtualDom.ts'
import * as GetSearchResultsVirtualDom from '../GetSearchResultsVirtualDom/GetSearchResultsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSearchVirtualDom = (
  visibleItems: readonly DisplaySearchResult[],
  flags: number,
  message: string,
  focusOutline: boolean,
  searchInputErrorMessage: string,
  scrollBarHeight: number,
  scrollBarY: number,
  scrollBarValue: number,
  deltaY: number,
  itemHeight: number,
  matchCount: number,
  focus: number = 0,
): readonly VirtualDomNode[] => {
  const errorDom = GetSearchInputErrorVirtualDom.getSearchInputErrorVirtualDom(searchInputErrorMessage)
  const childCount = 2 + (errorDom.length > 0 ? 1 : 0)

  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.Search),
      childCount,
    },
    ...GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, message, searchInputErrorMessage, matchCount),
    ...errorDom,
    ...GetSearchResultsVirtualDom.getSearchResultsVirtualDom(
      visibleItems,
      focusOutline,
      scrollBarHeight,
      scrollBarY,
      scrollBarValue,
      deltaY,
      itemHeight,
    ),
  ]
}
