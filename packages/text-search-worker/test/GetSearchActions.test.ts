import { test, expect } from '@jest/globals'
import { getActions } from '../src/parts/GetSearchActions/GetSearchActions.ts'

test('getSearchActions - should return array of search actions', () => {
  expect(getActions()).toEqual([
    {
      command: 'refresh',
      icon: 'Refresh',
      id: 'Refresh',
      label: 'Refresh',
      type: 1,
      enabled: true,
    },
    {
      command: 'clearSearchResults',
      icon: 'ClearAll',
      id: 'ClearAll',
      label: 'Clear Search Results',
      type: 1,
      enabled: true,
    },
    {
      command: '',
      icon: 'NewFile',
      id: 'OpenSearchEditor',
      label: 'Open New Search Editor',
      type: 1,
      enabled: true,
    },
    {
      command: '',
      icon: 'ListFlat',
      id: 'ViewAsTree',
      label: 'View as Tree',
      type: 1,
      enabled: true,
    },
    {
      command: '',
      icon: 'CollapseAll',
      id: 'CollapseAll',
      label: 'Collapse All',
      type: 1,
    },
  ])
})
