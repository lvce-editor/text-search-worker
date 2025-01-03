import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import * as GetScrollBarVirtualDom from '../GetScrollBarVirtualDom/GetScrollBarVirtualDom.ts'
import * as GetTreeItemsVirtualDom from '../GetTreeItemsVirtualDom/GetTreeItemsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

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
    ...GetTreeItemsVirtualDom.getTreeItemsVirtualDom(visibleItems),
    ...GetScrollBarVirtualDom.getScrollBarVirtualDom(scrollbarHeight, scrollBarY),
  ]
}
