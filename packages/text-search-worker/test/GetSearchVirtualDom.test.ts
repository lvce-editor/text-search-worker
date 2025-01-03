import { test, expect } from '@jest/globals'
import type { DisplaySearchResult } from '../src/parts/DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../src/parts/VirtualDomNode/VirtualDomNode.ts'
import * as ExpandedType from '../src/parts/ExpandedType/ExpandedType.ts'
import { getSearchVirtualDom } from '../src/parts/GetSearchVirtualDom/GetSearchVirtualDom.ts'

test('getSearchVirtualDom returns correct virtual DOM structure', () => {
  const visibleItems: readonly DisplaySearchResult[] = [
    {
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
      expanded: ExpandedType.Expanded,
    },
    {
      text: 'Result 2',
      title: 'Title 2',
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
      expanded: ExpandedType.Expanded,
    },
  ]
  const flags = 0
  const message = 'Search results'
  const focusOutline = false
  const scrollBarHeight = 0
  const scrollBarY = 0

  const result: readonly VirtualDomNode[] = getSearchVirtualDom(visibleItems, flags, message, focusOutline, '', scrollBarHeight, scrollBarY)

  expect(result).toEqual([
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
      text: 'Search results',
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
      childCount: 2,
      className: 'TreeItems',
      onBlur: 'handleListBlur',
      onClick: 'handleClick',
      onWheel: 'handleWheel',
      type: 4,
    },
    {
      ariaDescription: '',
      ariaExpanded: 'true',
      ariaLabel: 'Title 1',
      ariaLevel: 0,
      ariaPosInSet: 0,
      ariaSetSize: 0,
      childCount: 4,
      className: 'TreeItem',
      paddingLeft: '1rem',
      paddingRight: '12px',
      role: 'treeitem',
      title: 'Title 1',
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
      childCount: 1,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Result 1',
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
    {
      ariaDescription: '',
      ariaExpanded: 'true',
      ariaLabel: 'Title 2',
      ariaLevel: 0,
      ariaPosInSet: 0,
      ariaSetSize: 0,
      childCount: 4,
      className: 'TreeItem',
      paddingLeft: '1rem',
      paddingRight: '12px',
      role: 'treeitem',
      title: 'Title 2',
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
      childCount: 1,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: 'Result 2',
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
