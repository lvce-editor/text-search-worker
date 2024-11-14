import { test, expect } from '@jest/globals'
import { getSearchVirtualDom } from '../src/parts/GetSearchVirtualDom/GetSearchVirtualDom.ts'
import type { VirtualDomNode } from '../src/parts/VirtualDomNode/VirtualDomNode.ts'
import type { DisplaySearchResult } from '../src/parts/DisplaySearchResult/DisplaySearchResult.ts'

test('getSearchVirtualDom returns correct virtual DOM structure', () => {
  const visibleItems: readonly DisplaySearchResult[] = [
    {
      type: 1,
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
    },
    {
      type: 1,
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
    },
  ]
  const replaceExpanded = false
  const matchCase = false
  const matchWholeWord = false
  const useRegularExpression = false
  const message = 'Search results'
  const detailsExpanded = false
  const focusOutline = false

  const result: readonly VirtualDomNode[] = getSearchVirtualDom(
    visibleItems,
    replaceExpanded,
    matchCase,
    matchWholeWord,
    useRegularExpression,
    message,
    detailsExpanded,
    focusOutline,
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
      childCount: 2,
      className: 'Viewlet List',
      onBlur: 'handleListBlur',
      onClick: 'handleClick',
      role: 'tree',
      tabIndex: 0,
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
