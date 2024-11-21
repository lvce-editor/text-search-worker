import { expect, test } from '@jest/globals'
import * as GetSearchHeaderDetailsExpandedVirtualDom from '../src/parts/GetSearchHeaderDetailsExpandedVirtualDom/GetSearchHeaderDetailsExpandedVirtualDom.ts'

test('getSearchHeaderDetailsExpandedVirtualDom', () => {
  const message = 'test message'
  const dom = GetSearchHeaderDetailsExpandedVirtualDom.getSearchHeaderDetailsExpandedVirtualDom(message)
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
