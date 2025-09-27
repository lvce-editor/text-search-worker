import { MenuEntryId, MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'

export const getMenuEntryIds = (): readonly number[] => {
  return [MenuEntryId.Search]
}

export const getMenuEntries = (): readonly MenuEntry[] => {
  return [
    {
      id: 'dismiss',
      label: 'dismiss',
      flags: MenuItemFlags.None,
      command: /* TODO */ '',
    },
    {
      id: 'copyPath',
      label: 'copyPath',
      flags: MenuItemFlags.None,
      command: /* TODO */ '',
    },
  ]
}
