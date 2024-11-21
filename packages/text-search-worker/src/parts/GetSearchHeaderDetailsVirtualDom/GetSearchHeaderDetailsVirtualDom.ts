import * as ClassNames from '../ClassNames/ClassNames.ts'
import { DetailsExpanded } from '../SearchFlags/SearchFlags.ts'
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
  if (isExpanded) {
    dom.push(
      text('files to include'),
      {
        type: VirtualDomElements.Input,
        childCount: 0,
      },
      text('files to exclude'),
      {
        type: VirtualDomElements.Input,
        childCount: 0,
      },
    )
  }
  return dom
}
