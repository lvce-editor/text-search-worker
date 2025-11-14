import { expect, test } from '@jest/globals'
import { MenuItemFlags } from '@lvce-editor/constants'
import { getMenuEntries } from '../src/parts/GetMenuEntries/GetMenuEntries.ts'
import * as SearchStrings from '../src/parts/SearchStrings/SearchStrings.ts'

test('getMenuEntries returns menu entries with correct structure', () => {
  const entries = getMenuEntries()
  expect(entries).toHaveLength(2)
  expect(entries[0]).toEqual({
    id: 'dismiss',
    label: SearchStrings.dismiss(),
    flags: MenuItemFlags.None,
    command: 'Search.removeCurrent',
  })
  expect(entries[1]).toEqual({
    id: 'copyPath',
    label: SearchStrings.copyPath(),
    flags: MenuItemFlags.None,
    command: 'Search.copyPath',
  })
})
