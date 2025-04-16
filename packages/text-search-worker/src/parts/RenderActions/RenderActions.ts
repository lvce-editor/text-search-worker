import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetActionsVirtualDom from '../GetActionsVirtualDom/GetActionsVirtualDom.ts'
import * as GetSearchActions from '../GetSearchActions/GetSearchActions.ts'

export const renderActions = (uid: number): readonly VirtualDomNode[] => {
  const actions = GetSearchActions.getActions()
  const dom = GetActionsVirtualDom.getActionsVirtualDom(actions)
  return dom
}
