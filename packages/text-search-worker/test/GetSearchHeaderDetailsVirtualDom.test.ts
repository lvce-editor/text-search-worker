import { expect, test } from '@jest/globals'
import * as GetSearchHeaderDetailsVirtualDom from '../src/parts/GetSearchHeaderDetailsVirtualDom/GetSearchHeaderDetailsVirtualDom.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('getSearchHeaderDetailsVirtualDom - collapsed', () => {
  const flags = 0
  const message = 'test message'
  const dom = GetSearchHeaderDetailsVirtualDom.getSearchHeaderDetailsVirtualDom(flags, message)
  expect(dom).toEqual([
    {
      type: 4,
      className: 'SearchHeaderDetails',
      childCount: 2,
    },
    {
      type: 4,
      className: 'ToggleDetails',
      role: 'button',
      tabIndex: 0,
      ariaLabel: 'Toggle Search Details',
      title: 'Toggle Search Details',
      childCount: 1,
    },
    {
      type: 4,
      className: 'MaskIcon MaskIconEllipsis',
      childCount: 0,
    },
    {
      type: 4,
      className: 'ViewletSearchMessage',
      role: 'status',
      tabIndex: 0,
      childCount: 1,
    },
    {
      type: 12,
      text: 'test message',
      childCount: 0,
    },
  ])
})

test('getSearchHeaderDetailsVirtualDom - expanded', () => {
  const flags = SearchFlags.DetailsExpanded
  const message = 'test message'
  const dom = GetSearchHeaderDetailsVirtualDom.getSearchHeaderDetailsVirtualDom(flags, message)
  expect(dom).toEqual([
    {
      type: 4,
      className: 'SearchHeaderDetails',
      childCount: 5,
    },
    {
      type: 4,
      className: 'ToggleDetails',
      role: 'button',
      tabIndex: 0,
      ariaLabel: 'Toggle Search Details',
      title: 'Toggle Search Details',
      childCount: 1,
    },
    {
      type: 4,
      className: 'MaskIcon MaskIconEllipsis',
      childCount: 0,
    },
    {
      type: 12,
      text: 'Files to Include',
      childCount: 0,
    },
    {
      type: 6,
      childCount: 0,
    },
    {
      type: 12,
      text: 'Files to Exclude',
      childCount: 0,
    },
    {
      type: 6,
      childCount: 0,
    },
    {
      type: 4,
      className: 'ViewletSearchMessage',
      role: 'status',
      tabIndex: 0,
      childCount: 1,
    },
    {
      type: 12,
      text: 'test message',
      childCount: 0,
    },
  ])
})
