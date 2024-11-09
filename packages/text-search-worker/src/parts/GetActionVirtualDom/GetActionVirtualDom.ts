import type { Action } from '../Action/Action.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as GetActionButtonVirtualDom from '../GetActionButtonVirtualDom/GetActionButtonVirtualDom.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getActionVirtualDom = (action: Action): readonly VirtualDomNode[] => {
  switch (action.type) {
    case ActionType.Button:
      return GetActionButtonVirtualDom.getActionButtonVirtualDom(action)
    default:
      return []
  }
}
