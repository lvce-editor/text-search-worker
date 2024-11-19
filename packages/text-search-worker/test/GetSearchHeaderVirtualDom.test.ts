import { expect, test } from '@jest/globals'
import * as GetSearchHeaderVirtualDom from '../src/parts/GetSearchHeaderVirtualDom/GetSearchHeaderVirtualDom.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getSearchHeaderVirtualDom - with no flags', () => {
  const flags = 0
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags)
  expect(dom[0].childCount).toBe(2)
  expect(dom).toEqual([
    {
      childCount: 2,
      className: 'SearchHeader',
      onClick: 'handleHeaderClick',
      onFocusIn: 'handleHeaderFocusIn',
      role: 'none',
      type: 4,
    },
    {
      childCount: 2,
      className: 'SearchHeaderTop',
      role: 'none',
      type: 4,
    },
    {
      ariaExpanded: false,
      ariaLabel: 'Toggle Replace',
      childCount: 1,
      className: 'IconButton SearchToggleButton',
      'data-command': 'toggleReplace',
      title: 'Toggle Replace',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconChevronRight',
      type: 4,
    },
    {
      childCount: 1,
      className: 'SearchHeaderTopRight',
      role: 'none',
      type: 4,
    },
    {
      childCount: 2,
      className: 'SearchField',
      role: 'none',
      type: 4,
    },
    {
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: 'MultilineInputBox',
      name: 'search-value',
      onFocus: '',
      onInput: 'handleInput',
      placeholder: 'Search',
      spellcheck: false,
      type: 62,
    },
    {
      childCount: 3,
      className: 'SearchFieldButtons',
      type: 4,
    },
    {
      ariaChecked: false,
      childCount: 1,
      className: 'SearchFieldButton',
      role: 'checkbox',
      tabIndex: 0,
      title: 'Match Case',
      type: 4,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconCaseSensitive',
      type: 4,
    },
    {
      ariaChecked: false,
      childCount: 1,
      className: 'SearchFieldButton',
      role: 'checkbox',
      tabIndex: 0,
      title: 'Match Whole Word',
      type: 4,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconWholeWord',
      type: 4,
    },
    {
      ariaChecked: false,
      childCount: 1,
      className: 'SearchFieldButton',
      role: 'checkbox',
      tabIndex: 0,
      title: 'Use Regular Expression',
      type: 4,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconRegex',
      type: 4,
    },
  ])
})

test('getSearchHeaderVirtualDom - with details expanded', () => {
  const flags = SearchFlags.DetailsExpanded
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags)
  expect(dom[0].childCount).toBe(4)
  expect(dom[dom.length - 5].className).toBe('SearchHeaderDetails')
  expect(dom[dom.length - 4].text).toBe('files to include')
  expect(dom[dom.length - 2].text).toBe('files to exclude')
})

test('getSearchHeaderVirtualDom - with replace and details expanded', () => {
  const flags = SearchFlags.DetailsExpanded | SearchFlags.ReplaceExpanded
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags)
  expect(dom[0].childCount).toBe(4)
  expect(SearchFlags.hasDetailsExpanded(flags)).toBe(true)
  expect(SearchFlags.hasReplaceExpanded(flags)).toBe(true)
})
