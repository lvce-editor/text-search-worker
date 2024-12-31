import { expect, test } from '@jest/globals'
import * as GetSearchToggleVirtualDom from '../src/parts/GetSearchToggleVirtualDom/GetSearchToggleVirtualDom.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getSearchToggleVirtualDom - not expanded', () => {
  const flags = 0
  expect(GetSearchToggleVirtualDom.getSearchToggleVirtualDom(flags)).toEqual([
    {
      type: 1,
      className: 'IconButton SearchToggleButton',
      title: 'Toggle Replace',
      ariaLabel: 'Toggle Replace',
      ariaExpanded: false,
      childCount: 1,
      'data-command': 'toggleReplace',
      name: 'ToggleReplace',
    },
    {
      type: 4,
      className: 'MaskIcon MaskIconChevronRight',
      childCount: 0,
    },
  ])
})

test('getSearchToggleVirtualDom - expanded', () => {
  const flags = SearchFlags.ReplaceExpanded
  expect(GetSearchToggleVirtualDom.getSearchToggleVirtualDom(flags)).toEqual([
    {
      type: 1,
      className: 'IconButton SearchToggleButton SearchToggleButtonExpanded',
      title: 'Toggle Replace',
      ariaLabel: 'Toggle Replace',
      ariaExpanded: true,
      childCount: 1,
      'data-command': 'toggleReplace',
      name: 'ToggleReplace',
    },
    {
      type: 4,
      className: 'MaskIcon MaskIconChevronDown',
      childCount: 0,
    },
  ])
})
