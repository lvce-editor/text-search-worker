import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getMenuEntriesInput = (options: ContextMenuProps): readonly MenuEntry[] => {
  const { inputName } = options
  if (!inputName) {
    return []
  }
  return [
    {
      id: 'cut',
      label: SearchStrings.cut(),
      flags: MenuItemFlags.None,
      command: 'Search.cut',
      args: [inputName],
    },
    {
      id: 'copy',
      label: SearchStrings.copy(),
      flags: MenuItemFlags.None,
      command: 'Search.copy',
      args: [inputName],
    },
    {
      id: 'paste',
      label: SearchStrings.paste(),
      flags: MenuItemFlags.None,
      command: 'Search.paste',
      args: [inputName],
    },
    {
      id: 'selectAll',
      label: SearchStrings.selectAll(),
      flags: MenuItemFlags.None,
      command: 'Search.selectAll',
      args: [inputName],
    },
  ]
}
