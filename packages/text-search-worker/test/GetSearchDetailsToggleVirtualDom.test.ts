import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import * as GetSearchDetailsToggleVirtualDom from '../src/parts/GetSearchDetailsToggleVirtualDom/GetSearchDetailsToggleVirtualDom.ts'

test('getSearchDetailsToggleVirtualDom', () => {
  expect(GetSearchDetailsToggleVirtualDom.getSearchDetailsToggleVirtualDom()).toEqual([
    {
      type: 1,
      className: 'ToggleDetails',
      onClick: 5,
      role: AriaRoles.Button,
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
  ])
})
