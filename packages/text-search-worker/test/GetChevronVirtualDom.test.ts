import { expect, test } from '@jest/globals'
import * as GetChevronVirtualDom from '../src/parts/GetChevronVirtualDom/GetChevronVirtualDom.ts'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'

test('getChevronDownVirtualDom', () => {
  expect(GetChevronVirtualDom.chevronDownVirtualDom).toEqual({
    type: VirtualDomElements.Div,
    className: 'Chevron MaskIconChevronDown',
    childCount: 0,
  })
})

test('getChevronRightVirtualDom', () => {
  expect(GetChevronVirtualDom.chevronRightVirtualDom).toEqual({
    type: VirtualDomElements.Div,
    className: 'Chevron MaskIconChevronRight',
    childCount: 0,
  })
})
