import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getBadgeVirtualDom = (className: string, badgeText: string): readonly VirtualDomNode[] => {
  if (!badgeText) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Badge, className),
      childCount: 1,
    },
    text(badgeText),
  ]
}
