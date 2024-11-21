import { expect, test } from '@jest/globals'
import * as GetSearchHeaderDetailsVirtualDom from '../src/parts/GetSearchHeaderDetailsVirtualDom/GetSearchHeaderDetailsVirtualDom.ts'

test('getSearchHeaderDetailsVirtualDom', () => {
  const dom = GetSearchHeaderDetailsVirtualDom.getSearchHeaderDetailsVirtualDom()
  expect(dom[0]).toEqual({
    type: 4,
    className: 'SearchHeaderDetails',
    childCount: 4,
  })
  expect(dom[1].text).toBe('files to include')
  expect(dom[2]).toEqual({
    type: 6,
    childCount: 0,
  })
  expect(dom[3].text).toBe('files to exclude')
  expect(dom[4]).toEqual({
    type: 6,
    childCount: 0,
  })
})
