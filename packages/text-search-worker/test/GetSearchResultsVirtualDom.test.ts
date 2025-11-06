import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import type { DisplaySearchResult } from '../src/parts/DisplaySearchResult/DisplaySearchResult.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExpandedType from '../src/parts/ExpandedType/ExpandedType.ts'
import * as GetSearchResultsVirtualDom from '../src/parts/GetSearchResultsVirtualDom/GetSearchResultsVirtualDom.ts'

test('getSearchResultsVirtualDom', () => {
  const searchResults: readonly DisplaySearchResult[] = [
    {
      matchStart: 0,
      matchLength: 1,
      text: 'abc',
      title: 'abc',
      icon: 'test',
      setSize: 2,
      posInSet: 2,
      depth: 0,
      replacement: '',
      badgeText: '',
      focused: false,
      expanded: ExpandedType.Expanded,
    },
  ]
  const focusOutline = false
  const scrollBarHeight = 0
  const scrollBarY = 0
  const scrollBarValue = 0
  const deltaY = 0
  const itemHeight = 1
  expect(
    GetSearchResultsVirtualDom.getSearchResultsVirtualDom(
      searchResults,
      focusOutline,
      scrollBarHeight,
      scrollBarY,
      scrollBarValue,
      deltaY,
      itemHeight,
    ),
  ).toEqual([
    {
      type: 4,
      className: 'Viewlet List Tree',
      role: AriaRoles.Tree,
      tabIndex: 0,
      childCount: 1,
      onBlur: DomEventListenerFunctions.HandleListBlur,
      // onPointerDown: DomEventListenerFunctions.HandleListPointerDown,
      // onFocus: DomEventListenerFunctions.HandleListFocus,
    },
    {
      childCount: 1,
      className: 'TreeItems',
      id: 'TreeItems',
      onBlur: 11,
      onClick: 1,
      onWheel: 16,
      onContextMenu: 2,
      top: '0px',
      type: 4,
    },
    {
      ariaDescription: '',
      ariaExpanded: 'true',
      ariaLabel: 'abc',
      ariaLevel: 0,
      ariaPosInSet: 2,
      ariaSetSize: 2,
      childCount: 4,
      className: 'TreeItem',
      paddingLeft: '1rem',
      paddingRight: '12px',
      role: AriaRoles.TreeItem,
      title: 'abc',
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
      role: AriaRoles.None,
      src: 'test',
      type: 17,
    },
    {
      childCount: 3,
      className: 'Label Grow',
      type: 4,
    },
    {
      childCount: 0,
      text: '',
      type: 12,
    },
    {
      childCount: 1,
      className: 'Highlight',
      type: 8,
    },
    {
      childCount: 0,
      text: 'a',
      type: 12,
    },
    {
      childCount: 0,
      text: 'bc',
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
