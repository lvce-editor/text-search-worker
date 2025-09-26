import { expect, test } from '@jest/globals'
import { AriaRoles } from '@lvce-editor/constants'
import * as GetSearchHeaderDetailsCollapsedVirtualDom from '../src/parts/GetSearchHeaderDetailsCollapsedVirtualDom/GetSearchHeaderDetailsCollapsedVirtualDom.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'

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
      className: 'ViewletSearchMessage ViewletSearchMessageIndented',
      role: AriaRoles.Status,
      tabIndex: 0,
      childCount: 1,
    },
    {
      type: 12,
      text: 'test message',
      childCount: 0,
    },
    {
      type: 1,
      className: 'ToggleDetails',
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: AriaRoles.Button,
      tabIndex: 0,
      ariaLabel: 'Toggle Search Details',
      title: 'Toggle Search Details',
      childCount: 1,
      name: 'ToggleSearchDetails',
    },
    {
      type: 4,
      className: 'MaskIcon MaskIconEllipsis',
      childCount: 0,
    },
  ])
})
