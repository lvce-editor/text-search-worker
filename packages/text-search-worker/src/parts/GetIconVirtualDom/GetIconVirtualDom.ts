import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getIconVirtualDom = (icon: string, type = VirtualDomElements.Div): VirtualDomNode => {
  return {
    type,
    className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, `MaskIcon${icon}`),
    role: AriaRoles.None,
    childCount: 0,
  }
}
