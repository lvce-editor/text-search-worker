import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getMenuEntriesList = (state: SearchState, props: ContextMenuProps): readonly MenuEntry[] => {
  return [
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
      id: 'copyAll',
      label: SearchStrings.copyAll(),
      flags: MenuItemFlags.None,
      command: 'Search.copyAll',
    },
  ]
}
