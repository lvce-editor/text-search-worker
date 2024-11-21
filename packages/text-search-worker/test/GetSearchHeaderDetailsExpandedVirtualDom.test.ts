import { expect, test } from '@jest/globals'
import * as GetSearchHeaderDetailsExpandedVirtualDom from '../src/parts/GetSearchHeaderDetailsExpandedVirtualDom/GetSearchHeaderDetailsExpandedVirtualDom.ts'

test('getSearchHeaderDetailsExpandedVirtualDom', () => {
  const message = 'test message'
  const dom = GetSearchHeaderDetailsExpandedVirtualDom.getSearchHeaderDetailsExpandedVirtualDom(message)
  expect(dom).toEqual([
    {
      childCount: 6,
      className: 'SearchHeaderDetailsExpanded',
      type: 4,
    },
    {
      ariaLabel: 'Toggle Search Details',
      childCount: 1,
      className: 'ToggleDetails',
      role: 'button',
      tabIndex: 0,
      title: 'Toggle Search Details',
      type: 4,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconEllipsis',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Files to Include',
      type: 12,
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
      name: 'files-to-include-value',
      onFocus: '',
      onInput: 'handleIncludeInput',
      placeholder: 'Include',
      spellcheck: false,
      type: 62,
    },
    {
      childCount: 0,
      className: 'SearchFieldButtons',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Files to Exclude',
      type: 12,
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
      name: 'files-to-exclude-value',
      onFocus: '',
      onInput: 'handleExcludeInput',
      placeholder: 'Exclude',
      spellcheck: false,
      type: 62,
    },
    {
      childCount: 0,
      className: 'SearchFieldButtons',
      type: 4,
    },
    {
      childCount: 1,
      className: 'ViewletSearchMessage',
      role: 'status',
      tabIndex: 0,
      type: 4,
    },
    {
      childCount: 0,
      text: 'test message',
      type: 12,
    },
  ])
})
