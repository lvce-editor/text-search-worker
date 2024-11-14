import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getChevronDownVirtualDom = (extraClassName = ''): VirtualDomNode => {
  return {
    type: VirtualDomElements.Div,
    className: MergeClassNames.mergeClassNames(ClassNames.Chevron, ClassNames.MaskIconChevronDown, extraClassName),
    childCount: 0,
  }
}

export const getChevronRightVirtualDom = (extraClassName = ''): VirtualDomNode => {
  return {
    type: VirtualDomElements.Div,
    className: MergeClassNames.mergeClassNames(ClassNames.Chevron, ClassNames.MaskIconChevronRight, extraClassName),
    childCount: 0,
  }
}
