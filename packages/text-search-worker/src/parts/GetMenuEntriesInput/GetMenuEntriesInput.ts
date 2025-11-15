import { MenuItemFlags } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getMenuEntriesInput = (): readonly MenuEntry[] => {
  return [
    {
      id: 'cut',
      label: SearchStrings.cut(),
      flags: MenuItemFlags.None,
      command: 'Search.cut',
    },
    {
      id: 'copy',
      label: SearchStrings.copy(),
      flags: MenuItemFlags.None,
      command: 'Search.copy',
    },
    {
      id: 'paste',
      label: SearchStrings.paste(),
      flags: MenuItemFlags.None,
      command: 'Search.paste',
    },
    {
      id: 'selectAll',
      label: SearchStrings.selectAll(),
      flags: MenuItemFlags.None,
      command: 'Search.selectAll',
    },
  ]
}
