import { expect, test } from '@jest/globals'
import type { DisplaySearchResult } from '../src/parts/DisplaySearchResult/DisplaySearchResult.ts'
import * as GetSearchResultsVirtualDom from '../src/parts/GetSearchResultsVirtualDom/GetSearchResultsVirtualDom.ts'

test('getSearchResultsVirtualDom', () => {
  const searchResults: readonly DisplaySearchResult[] = [
    {
      top: 20,
      type: 1,
      matchStart: 0,
      matchLength: 1,
      text: 'abc',
      title: 'abc',
      icon: '',
      setSize: 2,
      posInSet: 2,
      depth: 0,
      replacement: '',
      matchCount: 0,
      focused: false,
      lineNumber: 0,
    },
  ]
  const focusOutline = false
  expect(GetSearchResultsVirtualDom.getSearchResultsVirtualDom(searchResults, focusOutline)).toEqual([
    {
      type: 4,
      className: 'Viewlet List',
      role: 'tree',
      tabIndex: 0,
      childCount: 1,
      onClick: 'handleClick',
      onBlur: 'handleListBlur',
    },
    {
      ariaDescription: '',
      ariaExpanded: 'true',
      ariaLabel: 'abc',
      ariaLevel: 0,
      ariaPosInSet: 2,
      ariaSetSize: 2,
      childCount: 4,
      className: 'TreeItem',
      paddingLeft: '1rem',
      paddingRight: '12px',
      role: 'treeitem',
      title: 'abc',
      type: 4,
    },
    {
      childCount: 0,
      className: 'Chevron MaskIconChevronDown',
      type: 4,
    },
    {
      childCount: 0,
      className: 'FileIcon',
      role: 'none',
      src: '',
      type: 17,
    },
    {
      childCount: 3,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: '',
      type: 12,
    },
    {
      childCount: 1,
      className: 'Highlight',
      type: 8,
    },
    {
      childCount: 0,
      text: 'a',
      type: 12,
    },
    {
      childCount: 0,
      text: 'bc',
      type: 12,
    },
    {
      childCount: 1,
      className: 'SearchRemove',
      type: 4,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconClose',
      type: 4,
    },
  ])
})
