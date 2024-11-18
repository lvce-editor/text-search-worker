import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as ToggleMatchWholeWord from '../src/parts/ToggleMatchWholeWord/ToggleMatchWholeWord.ts'

test('toggleMatchWholeWord', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    matchWholeWord: false,
  }
  const newState = ToggleMatchWholeWord.toggleMatchWholeWord(initialState)
  expect(newState.matchWholeWord).toBe(true)
})
