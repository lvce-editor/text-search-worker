import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSearchDetailsToggleVirtualDom from '../GetSearchDetailsToggleVirtualDom/GetSearchDetailsToggleVirtualDom.ts'
import * as GetSearchFieldVirtualDom from '../GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'
import * as GetSearchMessageVirtualDom from '../GetSearchMessageVirtualDom/GetSearchMessageVirtualDom.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchHeaderDetailsExpandedVirtualDom = (message: string): readonly VirtualDomNode[] => {
  const includeButtons = [
    {
      icon: 'OpenEditors',
      title: SearchStrings.searchOnlyOpenEditors(),
      command: 'searchOnlyOpenEditors',
      checked: false,
    },
  ]

  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderDetailsExpanded,
      childCount: 5,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderDetailsExpandedTop,
      childCount: 2,
    },
    ...GetSearchDetailsToggleVirtualDom.getSearchDetailsToggleVirtualDom(),
    {
      type: VirtualDomElements.H4,
      className: ClassNames.SearchHeaderDetailsHeading,
      childCount: 1,
    },
    text(SearchStrings.filesToInclude()),
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom('files-to-include-value', 'Include', 'handleIncludeInput', includeButtons, []),
    {
      type: VirtualDomElements.H4,
      className: ClassNames.SearchHeaderDetailsHeading,
      childCount: 1,
    },
    text(SearchStrings.filesToExclude()),
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom('files-to-exclude-value', 'Exclude', 'handleExcludeInput', [], []),
    ...GetSearchMessageVirtualDom.getSearchMessageVirtualDom(message),
  ]
}
