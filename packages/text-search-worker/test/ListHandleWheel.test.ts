import { expect, test } from '@jest/globals'
import { handleWheel } from '../src/parts/ListHandleWheel/ListHandleWheel.ts'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'

test('handleWheel - scroll down', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    deltaY: 0,
    itemHeight: 20,
    finalDeltaY: 200,
    height: 500,
    headerHeight: 40,
  }

  const result = handleWheel(state, 0, 50)

  expect(result.deltaY).toBe(50)
})

test('handleWheel - scroll up', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    deltaY: 100,
    itemHeight: 20,
    finalDeltaY: 200,
    height: 500,
    headerHeight: 40,
  }

  const result = handleWheel(state, 0, -50)

  expect(result.deltaY).toBe(50)
})

test('handleWheel - clamps at boundaries', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    deltaY: 0,
    itemHeight: 20,
    finalDeltaY: 200,
    height: 500,
    headerHeight: 40,
  }

  // Test upper bound
  const resultUp = handleWheel(state, 0, 250)
  expect(resultUp.deltaY).toBe(200) // Clamped at finalDeltaY

  // Test lower bound
  const resultDown = handleWheel(state, 0, -50)
  expect(resultDown.deltaY).toBe(0) // Clamped at 0
})
