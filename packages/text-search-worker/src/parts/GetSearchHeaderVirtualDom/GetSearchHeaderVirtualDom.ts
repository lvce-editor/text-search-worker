import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchHeaderDetailsVirtualDom from '../GetSearchHeaderDetailsVirtualDom/GetSearchHeaderDetailsVirtualDom.ts'
import * as GetSearchHeaderTopVirtualDom from '../GetSearchHeaderTopVirtualDom/GetSearchHeaderTopVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchHeaderVirtualDom = (flags: number, message: string): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeader,
      role: AriaRoles.None,
      childCount: 3,
      onClick: DomEventListenerFunctions.HandleHeaderClick,
      onFocusIn: DomEventListenerFunctions.HandleHeaderFocusIn,
    },
    ...GetSearchHeaderTopVirtualDom.getSearchHeaderTopVirtualDom(flags),
    ...GetSearchHeaderDetailsVirtualDom.getSearchHeaderDetailsVirtualDom(flags, message),
  ]
  return dom
}
