import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
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
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: AriaRoles.Button,
      tabIndex: 0,
      title: 'Toggle Search Details',
      name: 'ToggleSearchDetails',
      type: 1,
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
      role: AriaRoles.None,
      type: 4,
    },
    {
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: 'MultilineInputBox',
      name: 'FilesToInclude',
      onFocus: '',
      onInput: 10,
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
      disabled: undefined,
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: AriaRoles.CheckBox,
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
      role: AriaRoles.None,
      type: 4,
    },
    {
      autocapitalize: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: 'MultilineInputBox',
      name: 'FilesToExclude',
      onFocus: '',
      onInput: 10,
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
      disabled: undefined,
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: AriaRoles.CheckBox,
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
      role: AriaRoles.Status,
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
