import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Action } from '../Action/Action.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'

export const getActionButtonVirtualDom = (action: Action): readonly VirtualDomNode[] => {
  const { id, icon, label } = action
  return [
    {
      type: VirtualDomElements.Button,
      className: ClassNames.IconButton,
      title: label,
      name: id,
      childCount: 1,
    },
    GetIconVirtualDom.getIconVirtualDom(icon),
  ]
}
