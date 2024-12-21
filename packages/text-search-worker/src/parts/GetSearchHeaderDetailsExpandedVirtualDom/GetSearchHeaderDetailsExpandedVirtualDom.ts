import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSearchDetailsToggleVirtualDom from '../GetSearchDetailsToggleVirtualDom/GetSearchDetailsToggleVirtualDom.ts'
import * as GetSearchFieldVirtualDom from '../GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'
import * as GetSearchMessageVirtualDom from '../GetSearchMessageVirtualDom/GetSearchMessageVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import { OpenEditors, UseIgnoreFiles } from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getSearchHeaderDetailsExpandedVirtualDom = (flags: number, message: string): readonly VirtualDomNode[] => {
  const includeButtons = [
    {
      icon: ClassNames.MaskIconBook,
      title: SearchStrings.searchOnlyOpenEditors(),
      command: 'searchOnlyOpenEditors',
      checked: Boolean(flags & OpenEditors),
      name: InputName.SearchOnlyOpenEditors,
    },
  ]

  const excludeButtons = [
    {
      icon: ClassNames.MaskIconExclude,
      title: SearchStrings.useExcludeSettings(),
      command: 'toggleUseExcludeSettings',
      checked: Boolean(flags & UseIgnoreFiles),
      name: InputName.UseExcludeSettings,
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
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(InputName.FilesToInclude, 'Include', 'handleIncludeInput', includeButtons, []),
    {
      type: VirtualDomElements.H4,
      className: ClassNames.SearchHeaderDetailsHeading,
      childCount: 1,
    },
    text(SearchStrings.filesToExclude()),
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(InputName.FilesToExclude, 'Exclude', 'handleExcludeInput', excludeButtons, []),
    ...GetSearchMessageVirtualDom.getSearchMessageVirtualDom(message),
  ]
}
