import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const chevronDownVirtualDom: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: MergeClassNames.mergeClassNames(ClassNames.Chevron, ClassNames.MaskIconChevronDown),
  childCount: 0,
}

export const chevronRightVirtualDom: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: MergeClassNames.mergeClassNames(ClassNames.Chevron, ClassNames.MaskIconChevronRight),
  childCount: 0,
}
