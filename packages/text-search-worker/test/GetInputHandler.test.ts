import { expect, test } from '@jest/globals'
import * as GetInputHandler from '../src/parts/GetInputHandler/GetInputHandler.ts'
import * as HandleInput from '../src/parts/HandleInput/HandleInput.ts'
import * as HandleReplaceInput from '../src/parts/HandleReplaceInput/HandleReplaceInput.ts'

test('GetInputHandler - should return handleInput function', () => {
  const name = 'search-value'
  const handler = GetInputHandler.getInputHandler(name)
  expect(handler).toBe(HandleInput.handleInput)
})

test('GetInputHandler - should return handleReplaceInput function', () => {
  const name = 'replacement-value'
  const handler = GetInputHandler.getInputHandler(name)
  expect(handler).toBe(HandleReplaceInput.handleReplaceInput)
})

test('GetInputHandler - error', () => {
  const name = 'unknown'
  expect(() => GetInputHandler.getInputHandler(name)).toThrow(new Error('unknown input handler: unknown'))
})
