import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import { SearchWarningMessage } from '../ClassNames/ClassNames.ts'

export const getSearchHeaderLimitHitVirtualDom = (limitHitWarning: string): readonly VirtualDomNode[] => {
  if (!limitHitWarning) {
    // TODO remove unused dom node
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
      className: SearchWarningMessage,
      childCount: 1,
    },

    // TODO warning triangle here
    text(limitHitWarning),
  ]
  return dom
}
