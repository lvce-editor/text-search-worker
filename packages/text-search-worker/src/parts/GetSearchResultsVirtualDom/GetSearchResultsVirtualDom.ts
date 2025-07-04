import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
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
  const scrollBarDomNodes = scrollbarHeight === 0 ? 0 : 1
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
      childCount: 1 + scrollBarDomNodes,
    },
    ...GetTreeItemsVirtualDom.getTreeItemsVirtualDom(visibleItems, deltaY, itemHeight),
    ...GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollbarHeight, scrollBarY, scrollBarValue),
  ]
}
