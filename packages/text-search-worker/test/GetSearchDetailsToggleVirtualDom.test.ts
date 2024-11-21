import { expect, test } from '@jest/globals'
import * as GetSearchDetailsToggleVirtualDom from '../src/parts/GetSearchDetailsToggleVirtualDom/GetSearchDetailsToggleVirtualDom.ts'

test('getSearchDetailsToggleVirtualDom', () => {
  expect(GetSearchDetailsToggleVirtualDom.getSearchDetailsToggleVirtualDom()).toEqual([
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
  ])
})
