import { expect, test } from '@jest/globals'
import * as GetSearchInputErrorVirtualDom from '../src/parts/GetSearchInputErrorVirtualDom/GetSearchInputErrorVirtualDom.ts'

test('getSearchInputErrorVirtualDom - with error message', () => {
  const errorMessage = 'Invalid regular expression'
  expect(GetSearchInputErrorVirtualDom.getSearchInputErrorVirtualDom(errorMessage)).toEqual([
    {
      type: 4,
      className: 'SearchInputError',
      role: 'alert',
      childCount: 1,
    },
    {
      type: 12,
      text: errorMessage,
      childCount: 0,
    },
  ])
})

test('getSearchInputErrorVirtualDom - without error message', () => {
  expect(GetSearchInputErrorVirtualDom.getSearchInputErrorVirtualDom('')).toEqual([])
})
