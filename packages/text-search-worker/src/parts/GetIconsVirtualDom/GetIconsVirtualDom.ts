import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'
import * as GetChevronVirtualDom from '../GetChevronVirtualDom/GetChevronVirtualDom.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'

export const getIconsVirtualDom = (expanded: number, icon: string): readonly VirtualDomNode[] => {
  switch (expanded) {
    case ExpandedType.Expanded:
      return [GetChevronVirtualDom.chevronDownVirtualDom, GetFileIconVirtualDom.getFileIconVirtualDom(icon)]
    case ExpandedType.Collapsed:
      return [GetChevronVirtualDom.chevronRightVirtualDom, GetFileIconVirtualDom.getFileIconVirtualDom(icon)]
    default:
      return []
  }
}
