import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getScrollBarVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: 'ScrollBar ScrollBarVertical',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: 'ScrollBarThumb',
      height: 150,
      childCount: 0,
    },
  ]
}
