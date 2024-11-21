import { expect, test } from '@jest/globals'
import * as GetSearchHeaderDetailsCollapsedVirtualDom from '../src/parts/GetSearchHeaderDetailsCollapsedVirtualDom/GetSearchHeaderDetailsCollapsedVirtualDom.ts'

test('getSearchHeaderDetailsCollapsedVirtualDom', () => {
  const message = 'test message'
  const dom = GetSearchHeaderDetailsCollapsedVirtualDom.getSearchHeaderDetailsCollapsedVirtualDom(message)
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
