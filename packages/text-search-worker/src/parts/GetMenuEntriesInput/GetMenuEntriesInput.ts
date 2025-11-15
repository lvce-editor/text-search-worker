import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getMenuEntriesInput = (): readonly MenuEntry[] => {
  return [
    {
      id: 'cut',
      label: SearchStrings.dismiss(),
      flags: MenuItemFlags.None,
      command: 'Search.removeCurrent',
    },
    {
      id: 'copyPath',
      label: SearchStrings.copyPath(),
      flags: MenuItemFlags.None,
      command: 'Search.copyPath',
    },
  ]
}
