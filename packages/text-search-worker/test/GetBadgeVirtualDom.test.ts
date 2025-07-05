import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetBadgeVirtualDom from '../src/parts/GetBadgeVirtualDom/GetBadgeVirtualDom.ts'

test('getBadgeVirtualDom - returns correct structure with custom class and count', () => {
  const count = '42'
  expect(GetBadgeVirtualDom.getBadgeVirtualDom(count)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'Badge SourceControlBadge',
      childCount: 1,
    },
    {
      type: 12,
      text: '42',
      childCount: 0,
    },
  ])
})
