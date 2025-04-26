import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as ClearSearchResults from '../src/parts/ClearSearchResults/ClearSearchResults.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'

test('clearSearchResults - clears state and focuses search input', () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, 'test', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt', end: 0, start: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match1', end: 0, start: 0, lineNumber: 0 },
    ],
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
    inputSource: InputSource.Script,
  })
})
