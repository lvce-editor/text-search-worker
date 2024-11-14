import { expect, test } from '@jest/globals'
import * as GetChevronVirtualDom from '../src/parts/GetChevronVirtualDom/GetChevronVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getChevronDownVirtualDom', () => {
  expect(GetChevronVirtualDom.getChevronDownVirtualDom()).toEqual({
    type: VirtualDomElements.Div,
    className: 'Chevron MaskIconChevronDown',
    childCount: 0,
  })
})

test('getChevronRightVirtualDom', () => {
  expect(GetChevronVirtualDom.getChevronRightVirtualDom()).toEqual({
    type: VirtualDomElements.Div,
    className: 'Chevron MaskIconChevronRight',
    childCount: 0,
  })
})
