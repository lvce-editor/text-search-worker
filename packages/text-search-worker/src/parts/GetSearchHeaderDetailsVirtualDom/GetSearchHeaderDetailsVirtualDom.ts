import * as ClassNames from '../ClassNames/ClassNames.ts'
import { DetailsExpanded } from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import * as GetSearchDetailsToggleVirtualDom from '../GetSearchDetailsToggleVirtualDom/GetSearchDetailsToggleVirtualDom.ts'
import * as GetSearchMessageVirtualDom from '../GetSearchMessageVirtualDom/GetSearchMessageVirtualDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

const getSearchHeaderDetailsExpandedVirtualDom = (message: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderDetails,
      childCount: 5,
    },
    ...GetSearchDetailsToggleVirtualDom.getSearchDetailsToggleVirtualDom(),
    text(SearchStrings.filesToInclude()),
    {
      type: VirtualDomElements.Input,
      childCount: 0,
    },
    text(SearchStrings.filesToExclude()),
    {
      type: VirtualDomElements.Input,
      childCount: 0,
    },
    ...GetSearchMessageVirtualDom.getSearchMessageVirtualDom(message),
  ]
}

const getSearchHeaderDetailsCollapsedVirtualDom = (message: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderDetails,
      childCount: 2,
    },
    ...GetSearchDetailsToggleVirtualDom.getSearchDetailsToggleVirtualDom(),
    ...GetSearchMessageVirtualDom.getSearchMessageVirtualDom(message),
  ]
}

export const getSearchHeaderDetailsVirtualDom = (flags: number, message: string): readonly VirtualDomNode[] => {
  const isExpanded = flags & DetailsExpanded
  if (isExpanded) {
    return getSearchHeaderDetailsExpandedVirtualDom(message)
  }
  return getSearchHeaderDetailsCollapsedVirtualDom(message)
}
