import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuPropsList } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getMenuEntriesFile = (state: SearchState, props: ContextMenuPropsList): readonly MenuEntry[] => {
  return [
    {
      id: 'replaceAll',
      label: SearchStrings.replaceAll(),
      flags: MenuItemFlags.None,
      command: 'Search.replaceAll',
    },
    {
      id: 'dismiss',
      label: SearchStrings.dismiss(),
      flags: MenuItemFlags.None,
      command: 'Search.removeCurrent',
    },
    {
      id: 'copy',
      label: SearchStrings.copy(),
      flags: MenuItemFlags.None,
      command: 'Search.copy',
    },
    {
      id: 'copyPath',
      label: SearchStrings.copyPath(),
      flags: MenuItemFlags.None,
      command: 'Search.copyPath',
    },
    {
      id: 'copyAll',
      label: SearchStrings.copyAll(),
      flags: MenuItemFlags.None,
      command: 'Search.copyAll',
    },
  ]
}
