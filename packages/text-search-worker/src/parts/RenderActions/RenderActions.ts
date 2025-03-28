import type { Action } from '../Action/Action.ts'
import * as GetActionsVirtualDom from '../GetActionsVirtualDom/GetActionsVirtualDom.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const renderActions = (uid: number): readonly any[] => {
  const { oldState, newState } = SearchViewStates.get(uid)
  if (oldState === newState) {
    return []
  }
  const actions: readonly Action[] = []
  const dom = GetActionsVirtualDom.getActionsVirtualDom(actions)
  return dom
}
