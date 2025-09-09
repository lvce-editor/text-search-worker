import { ClassNames, text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchHeaderLimitHitVirtualDom = (limitHitWarning: string): readonly VirtualDomNode[] => {
  if (!limitHitWarning) {
    return [
      {
        type: VirtualDomElements.Div,
        childCount: 0,
      },
    ]
  }
  const dom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ViewletSearchMessage,
      childCount: 1,
    },
    // TODO warning triangle here
    text(limitHitWarning),
  ]
  return dom
}
