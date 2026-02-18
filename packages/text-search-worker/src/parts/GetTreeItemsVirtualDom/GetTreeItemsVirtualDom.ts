import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as DomId from '../DomId/DomId.ts'
import * as GetSearchResultVirtualDom from '../GetSearchResultVirtualDom/GetSearchResultVirtualDom.ts'

export const getTreeItemsVirtualDom = (
  visibleItems: readonly DisplaySearchResult[],
  deltaY: number,
  itemHeight: number,
): readonly VirtualDomNode[] => {
  const pixelOffset = itemHeight === 0 ? 0 : deltaY % itemHeight
  const treeItemsTop = -pixelOffset
  return [
    {
      childCount: visibleItems.length,
      className: `${ClassNames.TreeItems} TreeItemsTop-${treeItemsTop}`,
      id: DomId.TreeItems,
      onBlur: DomEventListenerFunctions.HandleListBlur,
      onClick: DomEventListenerFunctions.HandleClick,
      onContextMenu: DomEventListenerFunctions.HandleListContextMenu,
      onWheel: DomEventListenerFunctions.HandleWheel,
      type: VirtualDomElements.Div,
    },
    ...visibleItems.flatMap(GetSearchResultVirtualDom.getSearchResultVirtualDom),
  ]
}
