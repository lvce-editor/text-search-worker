import { expect, test } from '@jest/globals'
import { setup } from '../src/test.js'

test('toggleReplace', async () => {
  const rpc = await setup()
  const uid = 1
  const x = 0
  const y = 0
  const width = 0
  const height = 0
  const workspacePath = ''
  const assetDir = ''
  const itemHeight = 22
  const value = ''
  const replacement = ''
  await rpc.invoke('TextSearch.create', uid, x, y, width, height, workspacePath, assetDir, itemHeight, value, replacement)
  await rpc.invoke('TextSearch.loadContent', uid, null)
  await rpc.invoke('TextSearch.toggleReplace', uid, null)
  const commands = await rpc.invoke('TextSearch.render', uid)
  expect(commands).toEqual([
    [
      'Viewlet.setDom2',
      1,
      [
        { type: 4, className: 'Viewlet Search', childCount: 2 },
        {
          type: 4,
          className: 'SearchHeader',
          role: 'none',
          childCount: 2,
          onClick: 'handleHeaderClick2',
          onFocusIn: 'handleHeaderFocusIn',
        },
        {
          type: 4,
          className: 'SearchHeaderTop',
          role: 'none',
          childCount: 2,
        },
        {
          type: 1,
          className: 'IconButton SearchToggleButton SearchToggleButtonExpanded',
          title: 'Toggle Replace',
          ariaLabel: 'Toggle Replace',
          name: 'ToggleReplace',

          ariaExpanded: true,
          childCount: 1,
          'data-command': 'toggleReplace',
        },
        {
          type: 4,
          className: 'MaskIcon MaskIconChevronDown',
          childCount: 0,
        },
        {
          type: 4,
          className: 'SearchHeaderTopRight',
          role: 'none',
          childCount: 2,
        },
        {
          type: 4,
          className: 'SearchField',
          role: 'none',
          childCount: 2,
        },
        {
          type: 62,
          className: 'MultilineInputBox',
          spellcheck: false,
          autocapitalize: 'off',
          autocorrect: 'off',
          placeholder: 'Search',
          name: 'SearchValue',
          onInput: 'handleInput',
          onFocus: '',
          childCount: 0,
        },
        { type: 4, className: 'SearchFieldButtons', childCount: 3 },
        {
          type: 1,
          className: 'SearchFieldButton',
          title: 'Match Case',
          name: 'MatchCase',
          role: 'checkbox',
          ariaChecked: false,
          tabIndex: 0,
          childCount: 1,
        },
        {
          type: 8,
          className: 'MaskIcon MaskIconCaseSensitive',
          childCount: 0,
        },
        {
          type: 1,
          className: 'SearchFieldButton',
          title: 'Match Whole Word',
          name: 'MatchWholeWord',
          role: 'checkbox',
          ariaChecked: false,
          tabIndex: 0,
          childCount: 1,
        },
        {
          type: 8,
          className: 'MaskIcon MaskIconWholeWord',
          childCount: 0,
        },
        {
          type: 1,
          className: 'SearchFieldButton',
          title: 'Use Regular Expression',
          name: 'UseRegularExpression',
          role: 'checkbox',
          ariaChecked: false,
          tabIndex: 0,
          childCount: 1,
        },
        { type: 8, className: 'MaskIcon MaskIconRegex', childCount: 0 },
        {
          type: 4,
          className: 'SearchFieldContainer',
          role: 'none',
          childCount: 2,
        },
        {
          type: 4,
          className: 'SearchField',
          role: 'none',
          childCount: 2,
        },
        {
          type: 62,
          className: 'MultilineInputBox',
          spellcheck: false,
          autocapitalize: 'off',
          autocorrect: 'off',
          placeholder: 'Replace',
          name: 'ReplaceValue',
          onInput: 'handleReplaceInput',
          onFocus: '',
          childCount: 0,
        },
        { type: 4, className: 'SearchFieldButtons', childCount: 1 },
        {
          type: 1,
          className: 'SearchFieldButton',
          title: 'Preserve Case',
          name: 'PreserveCase',
          role: 'checkbox',
          ariaChecked: false,
          tabIndex: 0,
          childCount: 1,
        },
        {
          type: 8,
          className: 'MaskIcon MaskIconPreserveCase',
          childCount: 0,
        },
        {
          type: 1,
          className: 'SearchFieldButton SearchFieldButtonDisabled',
          title: 'Replace All',
          name: 'ReplaceAll',
          role: 'checkbox',
          ariaChecked: false,
          tabIndex: 0,
          childCount: 1,
        },
        {
          type: 8,
          className: 'MaskIcon MaskIconReplaceAll',
          childCount: 0,
        },
        { type: 4, className: 'SearchHeaderDetails', childCount: 2 },
        {
          type: 4,
          className: 'ViewletSearchMessage',
          role: 'status',
          tabIndex: 0,
          childCount: 1,
        },
        { type: 12, text: '', childCount: 0 },
        {
          type: 4,
          className: 'ToggleDetails',
          role: 'button',
          tabIndex: 0,
          ariaLabel: 'Toggle Search Details',
          title: 'Toggle Search Details',
          name: 'ToggleSearchDetails',
          childCount: 1,
        },
        {
          type: 4,
          className: 'MaskIcon MaskIconEllipsis',
          childCount: 0,
        },
        {
          childCount: 1,
          className: 'Viewlet List Tree',
          role: 'tree',
          tabIndex: 0,
          type: 4,
        },
        {
          type: 4,
          id: 'TreeItems',
          className: 'TreeItems',
          childCount: 0,
          onClick: 'handleClick',
          onBlur: 'handleListBlur',
          onWheel: 'handleWheel',
          top: '0px',
        },
      ],
    ],
  ])
})
