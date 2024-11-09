import type { Action } from '../Action/Action.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getActions = (): readonly Action[] => {
  return [
    {
      type: ActionType.Button,
      id: SearchStrings.refresh(),
      icon: MaskIcon.Refresh,
      command: 'refresh',
    },
    {
      type: ActionType.Button,
      id: SearchStrings.clearSearchResults(),
      icon: MaskIcon.ClearAll,
      command: 'clearSearchResults',
    },
    {
      type: ActionType.Button,
      id: SearchStrings.openNewSearchEditor(),
      icon: MaskIcon.NewFile,
      command: '',
    },
    {
      type: ActionType.Button,
      id: SearchStrings.viewAsTree(),
      icon: MaskIcon.ListFlat,
      command: '',
    },
    {
      type: ActionType.Button,
      id: SearchStrings.collapseAll(),
      icon: MaskIcon.CollapseAll,
      command: '',
    },
  ]
}
