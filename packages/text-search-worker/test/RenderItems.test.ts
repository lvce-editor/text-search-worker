import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
test('renderItems - returns correct command structure', () => {
  const oldState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    excludeValue: '',
    focus: 0,
    focusSource: InputSource.Script,
    includeValue: '',
    inputSource: InputSource.Script,
    items: [],
    maxLineY: 0,
    minLineY: 0,
    uid: 1,
    value: '',
  }

  const newState: SearchState = {
    ...oldState,
    fileCount: 1,
    itemHeight: 22,
    items: [{ end: 0, lineNumber: 0, start: 0, text: 'item1', type: TextSearchResultType.File }],
    listItems: [{ end: 0, lineNumber: 0, start: 0, text: 'item1', type: TextSearchResultType.File }],
    uid: 1,
    value: 'test',
  }

  const result = RenderItems.renderItems(oldState, newState)
  expect(result).toEqual(['Viewlet.setDom2', 1, expect.any(Array)])
})

test('renderItems - handles empty items', () => {
  const oldState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [],
    maxLineY: 0,
    minLineY: 0,
    uid: 1,
  }

  const newState = {
    ...oldState,
    items: [],
    uid: 1,
  }

  const result = RenderItems.renderItems(oldState, newState)
  expect(result).toEqual(['Viewlet.setDom2', 1, expect.any(Array)])
})
