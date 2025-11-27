import { expect, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as ClearSearchResults from '../src/parts/ClearSearchResults/ClearSearchResults.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('clearSearchResults - clears state and focuses search input', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    workspacePath: 'test',
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
    replacement: '',
  })
})
