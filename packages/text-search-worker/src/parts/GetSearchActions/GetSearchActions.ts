import type { Action } from '../Action/Action.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getActions = (): readonly Action[] => {
  return [
    {
      type: ActionType.Button,
      label: SearchStrings.refresh(),
      icon: MaskIcon.Refresh,
      id: InputName.Refresh,
      command: 'refresh',
    },
    {
      type: ActionType.Button,
      label: SearchStrings.clearSearchResults(),
      icon: MaskIcon.ClearAll,
      command: 'clearSearchResults',
      id: InputName.ClearAll,
    },
    {
      type: ActionType.Button,
      label: SearchStrings.openNewSearchEditor(),
      icon: MaskIcon.NewFile,
      command: '',
      id: InputName.OpenSearchEditor,
    },
    {
      type: ActionType.Button,
      label: SearchStrings.viewAsTree(),
      icon: MaskIcon.ListFlat,
      command: '',
      id: InputName.ViewAsTree,
    },
    {
      type: ActionType.Button,
      label: SearchStrings.collapseAll(),
      icon: MaskIcon.CollapseAll,
      command: '',
      id: InputName.CollapseAll,
    },
  ]
}
