import { expect, test } from '@jest/globals'
import type { DisplaySearchResult } from '../src/parts/DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../src/parts/VirtualDomNode/VirtualDomNode.ts'
import * as ExpandedType from '../src/parts/ExpandedType/ExpandedType.ts'
import * as GetSearchVirtualDom from '../src/parts/GetSearchVirtualDom/GetSearchVirtualDom.ts'

test('getSearchVirtualDom returns correct virtual DOM structure', () => {
  const visibleItems: readonly DisplaySearchResult[] = [
    {
      text: 'Result 1',
      title: 'Title 1',
      badgeText: '',
      focused: false,
      depth: 0,
      icon: '',
      matchLength: 0,
      matchStart: 0,
      posInSet: 0,
      replacement: '',
      setSize: 0,
      expanded: ExpandedType.Expanded,
      childCount: 4,
    },
    {
      text: 'Result 2',
      title: 'Title 2',
      badgeText: '',
      focused: false,
      depth: 0,
      icon: '',
      matchLength: 0,
      matchStart: 0,
      posInSet: 0,
      replacement: '',
      setSize: 0,
      expanded: ExpandedType.Expanded,
      childCount: 4,
    },
  ]
  const flags = 0
  const message = 'Search results'
  const focusOutline = false
  const scrollBarHeight = 0
  const scrollBarY = 0
  const scrollBarValue = 0
  const deltaY = 0
  const ItemHeight = 1
  const matchCount = 1
  const focus = 0

  const result: readonly VirtualDomNode[] = GetSearchVirtualDom.getSearchVirtualDom(
    visibleItems,
    flags,
    message,
    focusOutline,
    '',
    scrollBarHeight,
    scrollBarY,
    scrollBarValue,
    deltaY,
    ItemHeight,
    matchCount,
    focus,
  )

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'Viewlet Search',
      type: 4,
    },
    {
      childCount: 2,
      className: 'SearchHeader',
      onClick: 'handleHeaderClick2',
      onFocusIn: 'handleHeaderFocusIn',
      onFocusOut: 'handleHeaderFocusOut',
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
      id: 'TreeItems',
      onBlur: 'handleListBlur',
      onClick: 'handleClick',
      onWheel: 'handleWheel',
      type: 4,
      top: '0px',
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
