import { expect, test } from '@jest/globals'
import type { SearchHeader } from '../src/parts/SearchHeader/SearchHeader.ts'
import * as CollapseDetails from '../src/parts/CollapseDetails/CollapseDetails.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'

test('collapseDetails - collapses expanded details', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: SearchFlags.DetailsExpanded,
  }
  const newState = CollapseDetails.collapseDetails(initialState)
  expect(newState.flags & SearchFlags.DetailsExpanded).toBeFalsy()
})

test.skip('collapseDetails - does nothing if already collapsed', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = CollapseDetails.collapseDetails(initialState)
  expect(newState).toEqual(initialState)
})
