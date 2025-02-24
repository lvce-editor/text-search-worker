import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import { handleScrollBarCaptureLost } from '../src/parts/ListHandleScrollBarCaptureLost/ListHandleScrollBarCaptureLost.ts'

test('handleScrollBarCaptureLost - sets scrollBarActive to false', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    scrollBarActive: true,
  }
  const result = handleScrollBarCaptureLost(state)
  expect(result).not.toBe(state)
  expect(result.scrollBarActive).toBe(false)
})
