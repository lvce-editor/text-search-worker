import { test, expect } from '@jest/globals'
import { getSearchVirtualDom } from '../src/parts/GetSearchVirtualDom/GetSearchVirtualDom.ts'
import type { VirtualDomNode } from '../src/parts/VirtualDomNode/VirtualDomNode.ts'
import type { DisplaySearchResult } from '../src/parts/DisplaySearchResult/DisplaySearchResult.ts'

test('getSearchVirtualDom returns correct virtual DOM structure', () => {
  const visibleItems: readonly DisplaySearchResult[] = [
    {
      /* mock display search result properties */
      type: 1,
      text: 'Result 1',
      title: 'Title 1',
      matchCount: 0,
      focused: false,
      depth: 0,
      icon: '',
      lineNumber: 0,
      matchLength: 0,
      matchStart: 0,
      posInSet: 0,
      replacement: '',
      setSize: 0,
      top: 0,
    },
    {
      /* mock display search result properties */
      type: 2,
      text: 'Result 2',
      title: 'Title 2',
      matchCount: 1,
      focused: true,
    },
  ]
  const replaceExpanded = false
  const matchCase = false
  const matchWholeWord = false
  const useRegularExpression = false
  const message = 'Search results'
  const detailsExpanded = false
  const focusOutline = false

  const result: readonly VirtualDomNode[] = getSearchVirtualDom(
    visibleItems,
    replaceExpanded,
    matchCase,
    matchWholeWord,
    useRegularExpression,
    message,
    detailsExpanded,
    focusOutline,
  )

  expect(result).toEqual([
    {
      type: 'div',
      className: 'viewlet search',
      childCount: 2,
    },
    // Expected structure from GetSearchHeaderVirtualDom
    {
      type: 'header',
      className: 'search-header',
      childCount: 1,
    },
    {
      type: 'div',
      className: 'viewlet-search-message',
      role: 'status',
      tabIndex: 0,
      childCount: 1,
    },
    {
      type: 'div',
      className: 'viewlet list',
      role: 'tree',
      tabIndex: 0,
      childCount: visibleItems.length,
    },
    // Expected structure from GetSearchResultsVirtualDom
    {
      type: 'result',
      className: 'result-item',
      childCount: 0,
    },
    {
      type: 'result',
      className: 'result-item',
      childCount: 0,
    },
  ])
})
