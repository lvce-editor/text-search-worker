import { expect, test } from '@jest/globals'
import * as GetBadgeVirtualDom from '../src/parts/GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getBadgeVirtualDom - returns correct structure with custom class and count', () => {
  const className = 'CustomBadge'
  const count = '42'
  expect(GetBadgeVirtualDom.getBadgeVirtualDom(className, count)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'Badge CustomBadge',
      childCount: 1,
    },
    {
      type: 12,
      text: '42',
      childCount: 0,
    },
  ])
})

test('getBadgeVirtualDom - handles zero count', () => {
  const className = 'EmptyBadge'
  const count = '0'
  expect(GetBadgeVirtualDom.getBadgeVirtualDom(className, count)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'Badge EmptyBadge',
      childCount: 1,
    },
    {
      type: 12,
      text: '0',
      childCount: 0,
    },
  ])
})

test('getBadgeVirtualDom - handles empty className', () => {
  const className = ''
  const count = '5'
  expect(GetBadgeVirtualDom.getBadgeVirtualDom(className, count)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: 'Badge',
      childCount: 1,
    },
    {
      type: 12,
      text: '5',
      childCount: 0,
    },
  ])
})
