import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchHeaderDetailsVirtualDom from '../GetSearchHeaderDetailsVirtualDom/GetSearchHeaderDetailsVirtualDom.ts'
import * as GetSearchHeaderTopVirtualDom from '../GetSearchHeaderTopVirtualDom/GetSearchHeaderTopVirtualDom.ts'

const parentNode: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.SearchHeader,
  role: AriaRoles.None,
  childCount: 2,
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
): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    parentNode,
    ...GetSearchHeaderTopVirtualDom.getSearchHeaderTopVirtualDom(flags, searchInputErrorMessage, matchCount, focus),
    ...GetSearchHeaderDetailsVirtualDom.getSearchHeaderDetailsVirtualDom(flags, message),
  ]
  return dom
}
