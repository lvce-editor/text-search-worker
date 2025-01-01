import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as ToggleDetailsExpanded from '../src/parts/ToggleDetailsExpanded/ToggleDetailsExpanded.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'

test('toggleDetailsExpanded - focuses include files input when expanding', async () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = await ToggleDetailsExpanded.toggleDetailsExpanded(initialState)
  expect(SearchFlags.hasDetailsExpanded(newState.flags)).toBe(true)
  expect(newState.focus).toBe(WhenExpression.FocusSearchIncludeInput)
  expect(newState.focusSource).toBe(InputSource.Script)
})

test('toggleDetailsExpanded - focuses search input when collapsing', async () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: SearchFlags.DetailsExpanded,
    focus: WhenExpression.FocusSearchIncludeInput,
  }
  const newState = await ToggleDetailsExpanded.toggleDetailsExpanded(initialState)
  expect(SearchFlags.hasDetailsExpanded(newState.flags)).toBe(false)
  expect(newState.focus).toBe(WhenExpression.FocusSearchInput)
  expect(newState.focusSource).toBe(InputSource.Script)
})
