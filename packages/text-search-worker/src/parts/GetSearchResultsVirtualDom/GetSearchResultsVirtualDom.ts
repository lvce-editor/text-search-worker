import * as GetSearchResultVirtualDom from '../GetSearchResultVirtualDom/GetSearchResultVirtualDom.ts'

export const getSearchResultsVirtualDom = (visibleItems: any) => {
  return visibleItems.flatMap(GetSearchResultVirtualDom.getSearchResultVirtualDom)
}
