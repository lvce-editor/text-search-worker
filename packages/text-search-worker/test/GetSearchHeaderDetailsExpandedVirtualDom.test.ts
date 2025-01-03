import { expect, test } from '@jest/globals'
import * as GetSearchHeaderDetailsExpandedVirtualDom from '../src/parts/GetSearchHeaderDetailsExpandedVirtualDom/GetSearchHeaderDetailsExpandedVirtualDom.ts'

test('getSearchHeaderDetailsExpandedVirtualDom', () => {
  const flags = 0
  const message = 'test message'
  const dom = GetSearchHeaderDetailsExpandedVirtualDom.getSearchHeaderDetailsExpandedVirtualDom(flags, message)
  expect(dom).toEqual([
    {
      childCount: 5,
      className: 'SearchHeaderDetailsExpanded',
      type: 4,
    },
    {
      childCount: 2,
      className: 'SearchHeaderDetailsExpandedTop',
      type: 4,
    },
    {
      ariaLabel: 'Toggle Search Details',
      childCount: 1,
      className: 'ToggleDetails',
      role: 'button',
      tabIndex: 0,
      title: 'Toggle Search Details',
      name: 'ToggleSearchDetails',
      type: 4,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconEllipsis',
      type: 4,
    },
    {
      childCount: 1,
      className: 'SearchHeaderDetailsHeading',
      type: 24,
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
      name: 'FilesToInclude',
      onFocus: '',
      onInput: 'handleIncludeInput',
      placeholder: 'Include',
      spellcheck: false,
      type: 62,
    },
    {
      childCount: 1,
      className: 'SearchFieldButtons',
      type: 4,
    },
    {
      ariaChecked: false,
      childCount: 1,
      className: 'SearchFieldButton',
      role: 'checkbox',
      tabIndex: 0,
      title: 'Search Only Open Editors',
      name: 'SearchOnlyOpenEditors',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconBook',
      type: 8,
    },
    {
      childCount: 1,
      className: 'SearchHeaderDetailsHeading',
      type: 24,
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
      name: 'FilesToExclude',
      onFocus: '',
      onInput: 'handleExcludeInput',
      placeholder: 'Exclude',
      spellcheck: false,
      type: 62,
    },
    {
      childCount: 1,
      className: 'SearchFieldButtons',
      type: 4,
    },
    {
      ariaChecked: false,
      childCount: 1,
      className: 'SearchFieldButton',
      role: 'checkbox',
      tabIndex: 0,
      name: 'UseExcludeSettings',
      title: 'Use Exclude Settings',
      type: 1,
    },
    {
      childCount: 0,
      className: 'MaskIcon MaskIconExclude',
      type: 8,
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
