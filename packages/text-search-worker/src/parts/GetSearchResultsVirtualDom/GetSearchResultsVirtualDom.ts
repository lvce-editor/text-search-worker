import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import * as GetSearchResultVirtualDom from '../GetSearchResultVirtualDom/GetSearchResultVirtualDom.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchResultsVirtualDom = (visibleItems: readonly DisplaySearchResult[]): readonly VirtualDomNode[] => {
  return visibleItems.flatMap(GetSearchResultVirtualDom.getSearchResultVirtualDom)
}
