import { expect, test } from '@jest/globals'
import { setup } from '../src/test.js'

test('handle-input', async () => {
  const rpc = await setup()
  const uid = 1
  const x = 0
  const y = 0
  const width = 300
  const height = 300
  const workspacePath = ''
  const assetDir = ''
  const itemHeight = 22
  const value = ''
  const replacement = ''
  await rpc.invoke('TextSearch.create', uid, x, y, width, height, workspacePath, assetDir, itemHeight, value, replacement)
  await rpc.invoke('TextSearch.handleInput', uid, 'abc')
  const commands = await rpc.invoke('TextSearch.render', uid)
  expect(commands).toEqual([
    [
      'Viewlet.setDom2',
      1,
      [
        {
          childCount: 2,
          className: 'Viewlet Search',
          type: 4,
        },
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
          name: 'ToggleReplace',
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
          name: 'SearchValue',
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
          name: 'MatchCase',
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
          name: 'MatchWholeWord',
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
          name: 'UseRegularExpression',
          type: 4,
        },
        {
          childCount: 0,
          className: 'MaskIcon MaskIconRegex',
          type: 4,
        },
        {
          childCount: 2,
          className: 'SearchHeaderDetails',
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
          text: 'TypeError: results must be of type array',
          type: 12,
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
          className: 'Viewlet List Tree',
          role: 'tree',
          tabIndex: 0,
          type: 4,
        },
        {
          childCount: 0,
          className: 'TreeItems',
          id: 'TreeItems',

          onBlur: 'handleListBlur',
          onClick: 'handleClick',
          onWheel: 'handleWheel',
          type: 4,
          top: '0px',
        },
      ],
    ],
    ['Viewlet.send', 1, 'setValue', 'abc', '[name="SearchValue"]'],
  ])
})
