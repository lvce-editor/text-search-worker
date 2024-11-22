import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchHeader } from '../src/parts/SearchHeader/SearchHeader.ts'
import * as ToggleDetailsExpanded from '../src/parts/ToggleDetailsExpanded/ToggleDetailsExpanded.ts'
import * as SearchFlags from '../src/parts/SearchFlags/SearchFlags.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('toggleDetailsExpanded - focuses include files input when expanding', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: 0,
  }
  const newState = ToggleDetailsExpanded.toggleDetailsExpanded(initialState)
  expect(SearchFlags.hasDetailsExpanded(newState.flags)).toBe(true)
  expect(newState.focus).toBe(WhenExpression.FocusSearchIncludeInput)
  expect(newState.focusSource).toBe(InputSource.Script)
})

test('toggleDetailsExpanded - focuses search input when collapsing', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    flags: SearchFlags.DetailsExpanded,
    focus: WhenExpression.FocusSearchIncludeInput,
  }
  const newState = ToggleDetailsExpanded.toggleDetailsExpanded(initialState)
  expect(SearchFlags.hasDetailsExpanded(newState.flags)).toBe(false)
  expect(newState.focus).toBe(WhenExpression.FocusSearchInput)
  expect(newState.focusSource).toBe(InputSource.Script)
})
