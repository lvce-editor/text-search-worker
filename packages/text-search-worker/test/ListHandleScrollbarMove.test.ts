import { expect, test } from '@jest/globals'
import * as ListHandleScrollBarMove from '../src/parts/ListHandleScrollBarMove/ListHandleScrollBarMove.ts'
import * as Create from '../src/parts/Create/Create.ts'
import { SearchState } from '../src/parts/SearchState/SearchState.ts'

test('handleScrollbarMove - move scrollbar', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    deltaY: 0,
    itemHeight: 20,
    finalDeltaY: 200,
    height: 500,
    headerHeight: 40,
  }

  const result = ListHandleScrollBarMove.handleScrollBarMove(state, 100)

  expect(result.deltaY).toBeCloseTo(26.0869)
})

test('handleScrollBarMove - clamps at upper bound', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    deltaY: 0,
    itemHeight: 20,
    finalDeltaY: 200,
    height: 500,
    headerHeight: 40,
  }

  const result = ListHandleScrollBarMove.handleScrollBarMove(state, 250)
  expect(result.deltaY).toBeCloseTo(91.304) // Clamped at finalDeltaY
})

test('handleScrollBarMove - clamps at lower bound', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    deltaY: 100,
    itemHeight: 20,
    finalDeltaY: 200,
    height: 500,
    headerHeight: 40,
  }

  const result = ListHandleScrollBarMove.handleScrollBarMove(state, -50)
  expect(result.deltaY).toBe(0) // Clamped at 0
})
