import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as GetFlags from '../src/parts/GetFlags/GetFlags.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

test('getFlags - gets flags from instance', () => {
  const uid = 1
  const initialState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 42,
  }
  SearchViewStates.set(uid, initialState, initialState)
  expect(GetFlags.getFlags(uid)).toBe(42)
})
