import { expect, test } from '@jest/globals'
import * as GetSearchHeaderVirtualDom from '../src/parts/GetSearchHeaderVirtualDom/GetSearchHeaderVirtualDom.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getSearchHeaderVirtualDom - with no flags', () => {
  const flags = 0
  const message = ''
  const errorMessage = ''
  const matchCount = 0
  const focus = 0
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, message, errorMessage, matchCount, focus)
  expect(dom).toEqual([
    {
      childCount: 2,
      className: 'SearchHeader',
      onClick: 'handleHeaderClick2',
      onFocusIn: 'handleHeaderFocusIn',
      onFocusOut: 'handleHeaderFocusOut',
      onContextMenu: 'handleHeaderContextMenu',
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
      name: 'ToggleReplace',
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
      name: 'SearchValue',
      onFocus: '',
      onInput: 'handleInput2',
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
      name: 'MatchCase',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconCaseSensitive',
      type: 8,
    },
    {
      ariaChecked: false,
      childCount: 1,
      className: 'SearchFieldButton',
      role: 'checkbox',
      tabIndex: 0,
      title: 'Match Whole Word',
      name: 'MatchWholeWord',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconWholeWord',
      type: 8,
    },
    {
      ariaChecked: false,
      childCount: 1,
      className: 'SearchFieldButton',
      role: 'checkbox',
      tabIndex: 0,
      title: 'Use Regular Expression',
      name: 'UseRegularExpression',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconRegex',
      type: 8,
    },
    {
      childCount: 2,
      className: 'SearchHeaderDetails',
      type: 4,
    },
    {
      childCount: 1,
      className: 'ViewletSearchMessage ViewletSearchMessageIndented',
      role: 'status',
      tabIndex: 0,
      type: 4,
    },
    {
      childCount: 0,
      text: '',
      type: 12,
    },
    {
      ariaLabel: 'Toggle Search Details',
      childCount: 1,
      className: 'ToggleDetails',
      role: 'button',
      tabIndex: 0,
      title: 'Toggle Search Details',
      type: 4,
      name: 'ToggleSearchDetails',
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconEllipsis',
      type: 4,
    },
  ])
})

test.skip('getSearchHeaderVirtualDom - with details expanded', () => {
  const flags = SearchFlags.DetailsExpanded
  const message = ''
  const errorMessage = ''
  const matchCount = 1
  const focus = 0
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, message, errorMessage, matchCount, focus)
  expect(dom[0].childCount).toBe(4)
  expect(dom[dom.length - 7].className).toBe('SearchHeaderDetails')
  expect(dom[dom.length - 6].text).toBe('files to include')
  expect(dom[dom.length - 4].text).toBe('files to exclude')
})

test.skip('getSearchHeaderVirtualDom - with replace and details expanded', () => {
  const flags = SearchFlags.DetailsExpanded | SearchFlags.ReplaceExpanded
  const message = ''
  const errorMessage = ''
  const matchCount = 1
  const focus = 0
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, message, errorMessage, matchCount, focus)
  expect(dom[0].childCount).toBe(4)
  expect(flags & SearchFlags.DetailsExpanded).toBeTruthy()
  expect(flags & SearchFlags.ReplaceExpanded).toBeTruthy()
})
