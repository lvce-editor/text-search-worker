import type { Action } from '../Action/Action.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as ActionType from '../ActionType/ActionType.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MaskIcon from '../MaskIcon/MaskIcon.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getActions = (state: SearchState): readonly Action[] => {
  const { value, replacement } = state
  const bothEmpty = value === '' && replacement === ''
  return [
    {
      type: ActionType.Button,
      label: SearchStrings.refresh(),
      icon: MaskIcon.Refresh,
      id: InputName.Refresh,
      command: 'refresh',
      enabled: true,
    },
    {
      type: ActionType.Button,
      label: SearchStrings.clearSearchResults(),
      icon: MaskIcon.ClearAll,
      command: 'clearSearchResults',
      id: InputName.ClearAll,
      enabled: !bothEmpty,
    },
    {
      type: ActionType.Button,
      label: SearchStrings.openNewSearchEditor(),
      icon: MaskIcon.NewFile,
      command: '',
      id: InputName.OpenSearchEditor,
      enabled: true,
    },
    {
      type: ActionType.Button,
      label: SearchStrings.viewAsTree(),
      icon: MaskIcon.ListFlat,
      command: '',
      id: InputName.ViewAsTree,
      enabled: true,
    },
    {
      type: ActionType.Button,
      label: SearchStrings.collapseAll(),
      icon: MaskIcon.CollapseAll,
      command: '',
      id: InputName.CollapseAll,
      enabled: true,
    },
  ]
}
