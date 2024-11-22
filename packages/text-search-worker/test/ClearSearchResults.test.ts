import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as ClearSearchResults from '../src/parts/ClearSearchResults/ClearSearchResults.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('clearSearchResults - clears state and focuses search input', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, 'test', ''),
    items: ['item1', 'item2'],
    minLineY: 10,
    maxLineY: 20,
    message: 'test message',
  }

  const result = ClearSearchResults.clearSearchResults(state)

  expect(result).toEqual({
    ...state,
    value: '',
    items: [],
    minLineY: 0,
    maxLineY: 0,
    message: '',
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
  })
})
