import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as DomId from '../DomId/DomId.ts'
import * as GetSearchResultVirtualDom from '../GetSearchResultVirtualDom/GetSearchResultVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getTreeItemsVirtualDom = (visibleItems: readonly DisplaySearchResult[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.TreeItems,
      childCount: visibleItems.length,
      onClick: DomEventListenerFunctions.HandleClick,
      onBlur: DomEventListenerFunctions.HandleListBlur,
      onWheel: DomEventListenerFunctions.HandleWheel,
      id: DomId.TreeItems,
    },
    ...visibleItems.flatMap(GetSearchResultVirtualDom.getSearchResultVirtualDom),
  ]
}
