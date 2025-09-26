import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { AriaRoles } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchHeaderDetailsVirtualDom from '../GetSearchHeaderDetailsVirtualDom/GetSearchHeaderDetailsVirtualDom.ts'
import { getSearchHeaderLimitHitVirtualDom } from '../GetSearchHeaderLimitHitWarningDom/GetSearchHeaderLimitHitWarningDom.ts'
import * as GetSearchHeaderTopVirtualDom from '../GetSearchHeaderTopVirtualDom/GetSearchHeaderTopVirtualDom.ts'

const parentNode: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.SearchHeader,
  role: AriaRoles.None,
  childCount: 3,
  onClick: DomEventListenerFunctions.HandleHeaderClick2,
  onFocusIn: DomEventListenerFunctions.HandleHeaderFocusIn,
  onFocusOut: DomEventListenerFunctions.HandleHeaderFocusOut,
  onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
}

export const getSearchHeaderVirtualDom = (
  flags: number,
  message: string,
  searchInputErrorMessage: string,
  matchCount: number,
  focus: number,
  limitHitWarning: string,
): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    parentNode,
    ...GetSearchHeaderTopVirtualDom.getSearchHeaderTopVirtualDom(flags, searchInputErrorMessage, matchCount, focus),
    ...GetSearchHeaderDetailsVirtualDom.getSearchHeaderDetailsVirtualDom(flags, message),
    ...getSearchHeaderLimitHitVirtualDom(limitHitWarning),
  ]
  return dom
}
