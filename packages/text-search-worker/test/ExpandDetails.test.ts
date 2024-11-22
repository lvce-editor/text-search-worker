import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchHeader } from '../src/parts/SearchHeader/SearchHeader.ts'
import * as ExpandDetails from '../src/parts/ExpandDetails/ExpandDetails.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('expandDetails - expands details and focuses include input', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = ExpandDetails.expandDetails(initialState)
  expect(SearchFlags.hasDetailsExpanded(newState.flags)).toBe(true)
  expect(newState.focus).toBe(WhenExpression.FocusSearchIncludeInput)
  expect(newState.focusSource).toBe(InputSource.Script)
})

test.skip('expandDetails - does nothing if already expanded', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: SearchFlags.DetailsExpanded,
    focus: WhenExpression.FocusSearchInput,
  }
  const newState = ExpandDetails.expandDetails(initialState)
  expect(newState).toBe(initialState)
})
