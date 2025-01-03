import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetScrollBarVirtualDom from '../GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as GetSearchResultVirtualDom from '../GetSearchResultVirtualDom/GetSearchResultVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSearchResultsVirtualDom = (
  visibleItems: readonly DisplaySearchResult[],
  focusOutline: boolean,
  scrollbarHeight: number,
  scrollBarY: number,
): readonly VirtualDomNode[] => {
  const scrollBarDomNodes = scrollbarHeight === 0 ? 0 : 1
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.List, focusOutline ? ClassNames.FocusOutline : ClassNames.Empty),
      role: AriaRoles.Tree,
      tabIndex: 0,
      childCount: visibleItems.length + scrollBarDomNodes,
      onClick: DomEventListenerFunctions.HandleClick,
      onBlur: DomEventListenerFunctions.HandleListBlur,
      onWheel: DomEventListenerFunctions.HandleWheel,
    },
    ...visibleItems.flatMap(GetSearchResultVirtualDom.getSearchResultVirtualDom),
    ...GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollbarHeight, scrollBarY),
  ]
}
