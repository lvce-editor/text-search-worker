import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as ToggleMatchWholeWord from '../src/parts/ToggleMatchWholeWord/ToggleMatchWholeWord.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('toggleMatchWholeWord', () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = ToggleMatchWholeWord.toggleMatchWholeWord(initialState)
  expect(SearchFlags.hasMatchWholeWord(newState.flags)).toBeTruthy()
})
