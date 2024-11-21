import * as ClassNames from '../ClassNames/ClassNames.ts'
import { DetailsExpanded } from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchHeaderDetailsVirtualDom = (flags: number): readonly VirtualDomNode[] => {
  const isExpanded = flags & DetailsExpanded
  const dom: VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderDetails,
      childCount: isExpanded ? 4 : 1,
    },
    {
      type: VirtualDomElements.Div,
      className: 'ToggleDetails',
      childCount: 0,
    },
  ]
  if (flags & DetailsExpanded) {
    dom.push(
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
    )
  }
  return dom
}