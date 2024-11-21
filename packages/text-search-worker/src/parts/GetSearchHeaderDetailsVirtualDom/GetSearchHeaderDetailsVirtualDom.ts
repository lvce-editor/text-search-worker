import * as ClassNames from '../ClassNames/ClassNames.ts'
import { DetailsExpanded } from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import * as GetSearchMessageVirtualDom from '../GetSearchMessageVirtualDom/GetSearchMessageVirtualDom.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchHeaderDetailsVirtualDom = (flags: number, message: string): readonly VirtualDomNode[] => {
  const isExpanded = flags & DetailsExpanded
  if (isExpanded) {
    return [
      {
        type: VirtualDomElements.Div,
        className: ClassNames.SearchHeaderDetails,
        childCount: 5,
      },
      {
        type: VirtualDomElements.Div,
        className: 'ToggleDetails',
        role: 'button',
        tabIndex: 0,
        ariaLabel: 'Toggle Search Details',
        title: 'Toggle Search Details',
        childCount: 1,
      },
      {
        type: VirtualDomElements.Div,
        className: 'MaskIcon MaskIconEllipsis',
        childCount: 0,
      },
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
    ]
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderDetails,
      childCount: 2,
    },
    ...GetSearchMessageVirtualDom.getSearchMessageVirtualDom(message),
    {
      type: VirtualDomElements.Div,
      className: 'ToggleDetails',
      role: 'button',
      tabIndex: 0,
      ariaLabel: 'Toggle Search Details',
      title: 'Toggle Search Details',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: 'MaskIcon MaskIconEllipsis',
      childCount: 0,
    },
  ]
}
