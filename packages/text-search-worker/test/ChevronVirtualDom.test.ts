import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ChevronVirtualDom from '../src/parts/ChevronVirtualDom/ChevronVirtualDom.ts'

test('getChevronDownVirtualDom', () => {
  expect(ChevronVirtualDom.chevronDownVirtualDom).toEqual({
    type: VirtualDomElements.Div,
    className: 'Chevron MaskIconChevronDown',
    childCount: 0,
  })
})

test('getChevronRightVirtualDom', () => {
  expect(ChevronVirtualDom.chevronRightVirtualDom).toEqual({
    type: VirtualDomElements.Div,
    className: 'Chevron MaskIconChevronRight',
    childCount: 0,
  })
})
