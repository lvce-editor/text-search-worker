import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getBadgeVirtualDom = (className: string, count: number): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: `Badge ${className}`,
      childCount: 1,
    },
    text(`${count}`),
  ]
}
