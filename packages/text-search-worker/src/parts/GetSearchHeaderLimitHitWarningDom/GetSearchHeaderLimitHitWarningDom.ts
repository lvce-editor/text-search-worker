import { ClassNames, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchHeaderLimitHitVirtualDom = (): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ViewletSearchMessage,
      childCount: 1,
    },
    // TODO warning triangle here
    text(`Limit Hit`),
  ]
  return dom
}
