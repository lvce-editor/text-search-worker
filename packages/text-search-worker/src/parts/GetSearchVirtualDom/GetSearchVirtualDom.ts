import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSearchHeaderVirtualDom from '../GetSearchHeaderVirtualDom/GetSearchHeaderVirtualDom.ts'
import * as GetSearchResultsVirtualDom from '../GetSearchResultsVirtualDom/GetSearchResultsVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'

export const getSearchVirtualDom = (
  visibleItems: readonly DisplaySearchResult[],
  flags: number,
  message: string,
  focusOutline: boolean,
  preserveCase: boolean,
): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.Search),
      childCount: 2,
    },
    ...GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ViewletSearchMessage,
      role: AriaRoles.Status,
      tabIndex: 0,
      childCount: 1,
    },
    text(message),

    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.List, focusOutline ? ClassNames.FocusOutline : ClassNames.Empty),
      role: AriaRoles.Tree,
      tabIndex: 0,
      childCount: visibleItems.length,
      onClick: DomEventListenerFunctions.HandleClick,
      onBlur: DomEventListenerFunctions.HandleListBlur,
    },
    ...GetSearchResultsVirtualDom.getSearchResultsVirtualDom(visibleItems),
  ]
  return dom
}
