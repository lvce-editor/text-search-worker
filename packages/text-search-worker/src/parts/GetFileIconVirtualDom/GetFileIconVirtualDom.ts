import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'

export const getFileIconVirtualDom = (icon: string): VirtualDomNode => {
  return {
    type: VirtualDomElements.Img,
    className: ClassNames.FileIcon,
    src: icon,
    role: AriaRoles.None,
    childCount: 0,
  }
}
