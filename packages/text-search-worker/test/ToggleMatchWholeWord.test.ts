import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleMatchWholeWord from '../src/parts/ToggleMatchWholeWord/ToggleMatchWholeWord.ts'

test('toggleMatchWholeWord', async () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = await ToggleMatchWholeWord.toggleMatchWholeWord(initialState)
  expect(SearchFlags.hasMatchWholeWord(newState.flags)).toBe(true)
})
