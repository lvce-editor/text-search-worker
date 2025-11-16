import { MenuItemFlags } from '@lvce-editor/constants'
import type { ContextMenuPropsInput } from '../ContextMenuProps/ContextMenuProps.ts'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { menuEntrySeparator } from '../MenuEntrySeparator/MenuEntrySeparator.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getMenuEntriesInput = (options: ContextMenuPropsInput): readonly MenuEntry[] => {
  const { inputName } = options
  if (!inputName) {
    return []
  }
  return [
    {
      id: 'cut',
      label: SearchStrings.cut(),
      flags: MenuItemFlags.None,
      command: 'Search.handleInputCut',
      args: [inputName],
    },
    {
      id: 'copy',
      label: SearchStrings.copy(),
      flags: MenuItemFlags.None,
      command: 'Search.handleInputCopy',
      args: [inputName],
    },
    {
      id: 'paste',
      label: SearchStrings.paste(),
      flags: MenuItemFlags.None,
      command: 'Search.handleInputPaste',
      args: [inputName],
    },
    menuEntrySeparator,
    {
      id: 'selectAll',
      label: SearchStrings.selectAll(),
      flags: MenuItemFlags.None,
      command: 'Search.handleInputSelectAll',
      args: [inputName],
    },
  ]
}
