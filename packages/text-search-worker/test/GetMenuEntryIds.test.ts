import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { getMenuEntryIds } from '../src/parts/GetMenuEntryIds/GetMenuEntryIds.ts'

test('getMenuEntryIds returns array with MenuEntryId.Search', () => {
  const result = getMenuEntryIds()
  expect(result).toEqual([MenuEntryId.Search])
})

test('getMenuEntryIds returns readonly array', () => {
  const result = getMenuEntryIds()
  expect(result).toHaveLength(1)
  expect(result[0]).toBe(MenuEntryId.Search)
})
