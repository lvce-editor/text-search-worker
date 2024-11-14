import * as GetSearchResultVirtualDom from '../GetSearchResultVirtualDom/GetSearchResultVirtualDom.ts'
import { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchResultsVirtualDom = (visibleItems: any): readonly VirtualDomNode[] => {
  return visibleItems.flatMap(GetSearchResultVirtualDom.getSearchResultVirtualDom)
}
