import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getBadgeVirtualDom = (className: string, count: number) => {
  return [
    {
      type: VirtualDomElements.Div,
      className: `Badge ${className}`,
      childCount: 1,
    },
    text(`${count}`),
  ]
}
