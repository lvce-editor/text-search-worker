import { test, expect } from '@jest/globals'
import * as GetActionsVirtualDom from '../src/parts/GetActionsVirtualDom/GetActionsVirtualDom.ts'
import { Action } from '../src/parts/Action/Action.ts'

test('getActionsVirtualDom - should return correct virtual dom structure', () => {
  const actions: readonly Action[] = [
    {
      id: 'searchInFiles',
      icon: 'Search in Files',
      command: 'Search.searchInFiles',
      type: 1,
    },
    {
      id: 'findInFile',
      icon: 'Find in File',
      command: 'Search.findInFile',
      type: 1,
    },
  ]

  expect(GetActionsVirtualDom.getActionsVirtualDom(actions)).toEqual([
    {
      childCount: 2,
      className: 'Actions',
      role: 'toolbar',
      type: 4,
    },
    {
      childCount: 1,
      className: 'IconButton',
      'data-command': 'Search.searchInFiles',
      title: 'searchInFiles',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconSearch in Files',
      role: 'none',
      type: 4,
    },
    {
      childCount: 1,
      className: 'IconButton',
      'data-command': 'Search.findInFile',
      title: 'findInFile',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconFind in File',
      role: 'none',
      type: 4,
    },
  ])
})

test('getActionsVirtualDom - should handle empty actions array', () => {
  expect(GetActionsVirtualDom.getActionsVirtualDom([])).toEqual([
    {
      type: 4,
      className: 'Actions',
      role: 'toolbar',
      childCount: 0,
    },
  ])
})
