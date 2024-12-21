import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSearchDetailsToggleVirtualDom from '../GetSearchDetailsToggleVirtualDom/GetSearchDetailsToggleVirtualDom.ts'
import * as GetSearchMessageVirtualDom from '../GetSearchMessageVirtualDom/GetSearchMessageVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSearchHeaderDetailsCollapsedVirtualDom = (message: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderDetails,
      childCount: 2,
    },
    ...GetSearchMessageVirtualDom.getSearchMessageVirtualDom(message),
    ...GetSearchDetailsToggleVirtualDom.getSearchDetailsToggleVirtualDom(),
  ]
}
