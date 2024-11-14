import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getBadgeVirtualDom = (className: string, count: number): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Badge, className),
      childCount: 1,
    },
    text(`${count}`),
  ]
}
