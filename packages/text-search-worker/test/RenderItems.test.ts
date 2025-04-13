import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as RenderItems from '../src/parts/RenderItems/RenderItems.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
test('renderItems - returns correct command structure', () => {
  const oldState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [],
    minLineY: 0,
    maxLineY: 0,
    uid: 1,
    value: '',
    includeValue: '',
    excludeValue: '',
    focus: 0,
    focusSource: InputSource.Script,
    inputSource: InputSource.Script,
  }

  const newState: SearchState = {
    ...oldState,
    items: [{ type: TextSearchResultType.File, text: 'item1', start: 0, end: 0, lineNumber: 0 }],
    uid: 1,
    itemHeight: 22,
    fileCount: 1,
    value: 'test',
    listItems: [{ type: TextSearchResultType.File, text: 'item1', start: 0, end: 0, lineNumber: 0 }],
  }

  const result = RenderItems.renderItems(oldState, newState)
  expect(result).toEqual(['Viewlet.setDom2', 1, expect.any(Array)])
})

test('renderItems - handles empty items', () => {
  const oldState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [],
    minLineY: 0,
    maxLineY: 0,
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
