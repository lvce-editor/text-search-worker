import { test, expect } from '@jest/globals'
import { getActions } from '../src/parts/GetSearchActions/GetSearchActions.ts'

test('getSearchActions - should return array of search actions', () => {
  expect(getActions()).toEqual([
    {
      command: 'refresh',
      icon: 'Refresh',
      id: 'Refresh',
      type: 1,
    },
    {
      command: 'clearSearchResults',
      icon: 'ClearAll',
      id: 'Clear Search Results',
      type: 1,
    },
    {
      command: '',
      icon: 'NewFile',
      id: 'Open New Search Editor',
      type: 1,
    },
    {
      command: '',
      icon: 'ListFlat',
      id: 'View as Tree',
      type: 1,
    },
    {
      command: '',
      icon: 'CollapseAll',
      id: 'Collapse All',
      type: 1,
    },
  ])
})
