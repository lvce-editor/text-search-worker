import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { setDeltaY } from '../src/parts/SetDeltaY/SetDeltaY.ts'

test('setDeltaY - no change when same deltaY', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 100,
    itemHeight: 20,
    finalDeltaY: 200,
    height: 500,
    headerHeight: 40,
    listItems: Array.from({ length: 100 }),
  }

  const result = setDeltaY(state, 100)
  expect(result).toBe(state)
})

test('setDeltaY - updates state with new deltaY', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    itemHeight: 20,
    finalDeltaY: 200,
    height: 500,
    headerHeight: 40,
    minLineY: 0,
    maxLineY: 23,
    listItems: Array.from({ length: 100 }),
  }

  const result = setDeltaY(state, 100)

  expect(result).not.toBe(state)
  expect(result.deltaY).toBe(100)
  expect(result.minLineY).toBe(5) // 100/20
  expect(result.maxLineY).toBe(29) // minLineY + visible items (23)
})

test('setDeltaY - clamps value within bounds', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    deltaY: 0,
    itemHeight: 20,
    finalDeltaY: 200,
    height: 500,
    headerHeight: 40,
    minLineY: 0,
    maxLineY: 23,
    listItems: Array.from({ length: 100 }),
  }

  const result = setDeltaY(state, 1000)

  expect(result).not.toBe(state)
  expect(result.deltaY).toBe(200)
  expect(result.minLineY).toBe(10) // 200/20
  expect(result.maxLineY).toBe(34) // minLineY + visible items (23)
})
