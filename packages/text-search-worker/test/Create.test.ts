import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'

test('create', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
  }
  expect(state).toBeDefined()
})
