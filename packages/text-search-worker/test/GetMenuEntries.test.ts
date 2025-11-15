import { expect, test } from '@jest/globals'
import { MenuEntryId, MenuItemFlags } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntries } from '../src/parts/GetMenuEntries/GetMenuEntries.ts'
import * as SearchStrings from '../src/parts/SearchStrings/SearchStrings.ts'

test('getMenuEntries returns menu entries with correct structure', () => {
  const state = createDefaultState()
  const params = {
    menuId: MenuEntryId.Search,
  }
  const entries = getMenuEntries(state, params)
  expect(entries).toHaveLength(5)
  expect(entries[0]).toEqual({
    id: 'replaceAll',
    label: SearchStrings.replaceAll(),
    flags: MenuItemFlags.None,
    command: 'Search.replaceAll',
  })
  expect(entries[1]).toEqual({
    id: 'dismiss',
    label: SearchStrings.dismiss(),
    flags: MenuItemFlags.None,
    command: 'Search.removeCurrent',
  })
  expect(entries[2]).toEqual({
    id: 'copy',
    label: SearchStrings.copy(),
    flags: MenuItemFlags.None,
    command: 'Search.copy',
  })
  expect(entries[3]).toEqual({
    id: 'copyPath',
    label: SearchStrings.copyPath(),
    flags: MenuItemFlags.None,
    command: 'Search.copyPath',
  })
  expect(entries[4]).toEqual({
    id: 'copyAll',
    label: SearchStrings.copyAll(),
    flags: MenuItemFlags.None,
    command: 'Search.copyAll',
  })
})
