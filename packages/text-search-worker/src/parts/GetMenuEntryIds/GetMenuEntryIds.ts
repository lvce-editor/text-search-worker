import { MenuEntryId } from '@lvce-editor/constants'

export const InputContextMenu = 91

export const getMenuEntryIds = (): readonly number[] => {
  return [MenuEntryId.Search, InputContextMenu]
}
