import { test, expect } from '@jest/globals'
import * as GetActionsVirtualDom from '../src/parts/GetActionsVirtualDom/GetActionsVirtualDom.ts'

test('getActionsVirtualDom - should return correct virtual dom structure', () => {
  const actions = [
    {
      id: 'searchInFiles',
      label: 'Search in Files',
      command: 'Search.searchInFiles',
    },
    {
      id: 'findInFile',
      label: 'Find in File',
      command: 'Search.findInFile',
    },
  ]

  expect(GetActionsVirtualDom.getActionsVirtualDom(actions)).toEqual([
    {
      type: 4,
      className: 'Actions',
      childCount: 2,
    },
    {
      type: 4,
      className: 'Action',
      title: 'Search in Files',
      'data-command': 'Search.searchInFiles',
      childCount: 1,
    },
    {
      type: 12,
      text: 'Search in Files',
      childCount: 0,
    },
    {
      type: 4,
      className: 'Action',
      title: 'Find in File',
      'data-command': 'Search.findInFile',
      childCount: 1,
    },
    {
      type: 12,
      text: 'Find in File',
      childCount: 0,
    },
  ])
})

test('getActionsVirtualDom - should handle empty actions array', () => {
  expect(GetActionsVirtualDom.getActionsVirtualDom([])).toEqual([
    {
      type: 4,
      className: 'Actions',
      childCount: 0,
    },
  ])
})
