import * as ClassNames from '../ClassNames/ClassNames.ts'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import * as GetSearchHeaderVirtualDom from '../GetSearchHeaderVirtualDom/GetSearchHeaderVirtualDom.ts'
import * as GetSearchResultsVirtualDom from '../GetSearchResultsVirtualDom/GetSearchResultsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchVirtualDom = (
  visibleItems: readonly DisplaySearchResult[],
  flags: number,
  message: string,
  focusOutline: boolean,
): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.Search),
      childCount: 2,
    },
    ...GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, message),
    ...GetSearchResultsVirtualDom.getSearchResultsVirtualDom(visibleItems, focusOutline),
  ]
  return dom
}
