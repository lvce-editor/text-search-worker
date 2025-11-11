import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('create', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
  }
  expect(state).toBeDefined()
})
