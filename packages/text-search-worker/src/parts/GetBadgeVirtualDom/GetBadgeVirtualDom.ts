import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const badge: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: MergeClassNames.mergeClassNames(ClassNames.Badge, ClassNames.SourceControlBadge),
  childCount: 1,
}

export const getBadgeVirtualDom = (badgeText: string): readonly VirtualDomNode[] => {
  if (!badgeText) {
    return []
  }
  return [badge, text(badgeText)]
}
