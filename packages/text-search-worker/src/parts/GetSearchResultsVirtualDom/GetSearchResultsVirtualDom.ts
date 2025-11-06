import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { HandleListBlur, HandleListFocus, HandleListPointerDown } from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetScrollBarVirtualDom from '../GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as GetTreeItemsVirtualDom from '../GetTreeItemsVirtualDom/GetTreeItemsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getSearchResultsVirtualDom = (
  visibleItems: readonly DisplaySearchResult[],
  focusOutline: boolean,
  scrollbarHeight: number,
  scrollBarY: number,
  scrollBarValue: number,
  deltaY: number,
  itemHeight: number,
): readonly VirtualDomNode[] => {
  const childCount = scrollbarHeight === 0 ? 1 : 2
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(
        ClassNames.Viewlet,
        ClassNames.List,
        ClassNames.Tree,
        focusOutline ? ClassNames.FocusOutline : ClassNames.Empty,
      ),
      role: AriaRoles.Tree,
      tabIndex: 0,
      childCount,
      onBlur: HandleListBlur,
      // TODO renable this when dom diffing is supported
      // onPointerDown: HandleListPointerDown,
      // onFocus: HandleListFocus,
    },
    ...GetTreeItemsVirtualDom.getTreeItemsVirtualDom(visibleItems, deltaY, itemHeight),
    ...GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollbarHeight, scrollBarY, scrollBarValue),
  ]
}
