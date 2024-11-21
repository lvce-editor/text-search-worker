import * as GetSearchHeaderDetailsCollapsedVirtualDom from '../GetSearchHeaderDetailsCollapsedVirtualDom/GetSearchHeaderDetailsCollapsedVirtualDom.ts'
import * as GetSearchHeaderDetailsExpandedVirtualDom from '../GetSearchHeaderDetailsExpandedVirtualDom/GetSearchHeaderDetailsExpandedVirtualDom.ts'
import { DetailsExpanded } from '../SearchFlags/SearchFlags.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchHeaderDetailsVirtualDom = (flags: number, message: string): readonly VirtualDomNode[] => {
  const isExpanded = flags & DetailsExpanded
  if (isExpanded) {
    return GetSearchHeaderDetailsExpandedVirtualDom.getSearchHeaderDetailsExpandedVirtualDom(message)
  }
  return GetSearchHeaderDetailsCollapsedVirtualDom.getSearchHeaderDetailsCollapsedVirtualDom(message)
}
