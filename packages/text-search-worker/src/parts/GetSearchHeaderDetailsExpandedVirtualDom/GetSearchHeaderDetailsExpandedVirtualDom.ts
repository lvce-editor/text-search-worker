import * as GetSearchDetailsToggleVirtualDom from '../GetSearchDetailsToggleVirtualDom/GetSearchDetailsToggleVirtualDom.ts'
import * as GetSearchFieldVirtualDom from '../GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'
import * as GetSearchMessageVirtualDom from '../GetSearchMessageVirtualDom/GetSearchMessageVirtualDom.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchHeaderDetailsExpandedVirtualDom = (message: string): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: 'SearchHeaderDetailsExpanded',
      childCount: 5,
    },
    ...GetSearchDetailsToggleVirtualDom.getSearchDetailsToggleVirtualDom(),
    text(SearchStrings.filesToInclude()),
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom('files-to-include-value', 'Include', 'handleIncludeInput', [], []),
    text(SearchStrings.filesToExclude()),
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom('files-to-exclude-value', 'Exclude', 'handleExcludeInput', [], []),
    ...GetSearchMessageVirtualDom.getSearchMessageVirtualDom(message),
  ]
}
