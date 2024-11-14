import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSearchHeaderVirtualDom from '../GetSearchHeaderVirtualDom/GetSearchHeaderVirtualDom.ts'
import * as GetSearchResultsVirtualDom from '../GetSearchResultsVirtualDom/GetSearchResultsVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchVirtualDom = (
  visibleItems: any,
  replaceExpanded: boolean,
  matchCase: boolean,
  matchWholeWord: boolean,
  useRegularExpression: boolean,
  message: string,
  detailsExpanded: boolean,
  focusOutline: boolean,
): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = []
  dom.push({
    type: VirtualDomElements.Div,
    className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.Search),
    childCount: 2,
  })
  dom.push(...GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(replaceExpanded, matchCase, matchWholeWord, useRegularExpression, detailsExpanded))
  dom.push(
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ViewletSearchMessage,
      role: AriaRoles.Status,
      tabIndex: 0,
      childCount: 1,
    },
    text(message),
  )
  dom.push({
    type: VirtualDomElements.Div,
    className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.List, focusOutline ? ClassNames.FocusOutline : ClassNames.Empty),
    role: AriaRoles.Tree,
    tabIndex: 0,
    childCount: visibleItems.length,
    onClick: DomEventListenerFunctions.HandleClick,
    onBlur: DomEventListenerFunctions.HandleListBlur,
  })
  dom.push(...GetSearchResultsVirtualDom.getSearchResultsVirtualDom(visibleItems))
  return dom
}
