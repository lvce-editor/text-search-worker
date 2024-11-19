import { expect, test } from '@jest/globals'
import * as GetSearchHeaderVirtualDom from '../src/parts/GetSearchHeaderVirtualDom/GetSearchHeaderVirtualDom.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getSearchHeaderVirtualDom - with no flags', () => {
  const flags = 0
  const detailsExpanded = false
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, detailsExpanded)
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
  ])
})

test('getSearchHeaderVirtualDom - with all flags enabled', () => {
  let flags = 0
  flags = SearchFlags.toggleMatchCase(flags)
  flags = SearchFlags.toggleMatchWholeWord(flags)
  flags = SearchFlags.toggleUseRegularExpression(flags)
  flags = SearchFlags.toggleReplaceExpanded(flags)
  flags = SearchFlags.togglePreserveCase(flags)

  const detailsExpanded = false
  const dom = GetSearchHeaderVirtualDom.getSearchHeaderVirtualDom(flags, detailsExpanded)

  expect(dom[2].ariaExpanded).toBe(true) // Replace expanded
  expect(dom[8].ariaChecked).toBe(true) // Match case
  expect(dom[10].ariaChecked).toBe(true) // Match whole word
  expect(dom[12].ariaChecked).toBe(true) // Use regular expression
})
