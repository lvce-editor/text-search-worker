import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getIconsVirtualDom = (icon: string): readonly VirtualDomNode[] => {
  if (icon) {
    return [GetFileIconVirtualDom.getFileIconVirtualDom(icon)]
  }
  return []
}
