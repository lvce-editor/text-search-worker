import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Action } from '../Action/Action.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetIconVirtualDom from '../GetIconVirtualDom/GetIconVirtualDom.ts'

export const getActionButtonVirtualDom = (action: Action): readonly VirtualDomNode[] => {
  const { id, icon, command } = action
  return [
    {
      type: VirtualDomElements.Button,
      className: ClassNames.IconButton,
      title: id,
      name: id,
      'data-command': command,
      childCount: 1,
    },
    GetIconVirtualDom.getIconVirtualDom(icon),
  ]
}
