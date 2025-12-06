import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchHeaderDetailsVirtualDom from '../GetSearchHeaderDetailsVirtualDom/GetSearchHeaderDetailsVirtualDom.ts'
import { getSearchHeaderLimitHitVirtualDom } from '../GetSearchHeaderLimitHitWarningDom/GetSearchHeaderLimitHitWarningDom.ts'
import * as GetSearchHeaderTopVirtualDom from '../GetSearchHeaderTopVirtualDom/GetSearchHeaderTopVirtualDom.ts'

const parentNode: VirtualDomNode = {
  childCount: 3,
  className: ClassNames.SearchHeader,
  onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
  role: AriaRoles.None,
  type: VirtualDomElements.Div,
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
