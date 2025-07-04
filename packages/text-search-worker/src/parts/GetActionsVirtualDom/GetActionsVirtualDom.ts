import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Action } from '../Action/Action.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as GetActionVirtualDom from '../GetActionVirtualDom/GetActionVirtualDom.ts'

export const getActionsVirtualDom = (actions: readonly Action[]): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Actions,
      role: AriaRoles.ToolBar,
      childCount: actions.length,
    },
    ...actions.flatMap(GetActionVirtualDom.getActionVirtualDom),
  ]
}
