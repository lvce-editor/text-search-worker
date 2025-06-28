import { expect, jest, test, beforeEach } from '@jest/globals'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import * as Render from '../src/parts/Render/Render.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'
import * as WhenExpression from '../src/parts/WhenExpression/WhenExpression.ts'

test('doRender - no changes returns empty commands', () => {
  const oldState = Create.create(1, 0, 0, 0, 0, '', '')
  SearchViewStates.set(1, oldState, oldState)

  const commands = Render.doRender(1)
  expect(commands).toEqual([])
})

test('doRender - renders items when changed', () => {
  const oldState = Create.create(1, 0, 0, 0, 0, '', '')
  const newState = {
    ...oldState,
    items: [{ type: TextSearchResultType.File, text: 'item1', start: 0, lineNumber: 0, end: 0 }],
    listItems: [{ type: TextSearchResultType.File, text: 'item1', start: 0, lineNumber: 0, end: 0 }],
    value: 'test',
    fileCount: 1,
  }
  SearchViewStates.set(1, oldState, newState)

  const commands = Render.doRender(1)
  expect(commands).toEqual([
    ['Viewlet.setDom2', 1, []],
    ['Viewlet.send', 1, 'setValue', 'test', '[name="SearchValue"]'],
  ])
})

test('doRender - renders focus when changed', () => {
  const oldState = Create.create(1, 0, 0, 0, 0, '', '')
  const newState = {
    ...oldState,
    focus: WhenExpression.FocusSearchInput,
    focusSource: InputSource.Script,
  }
  SearchViewStates.set(1, oldState, newState)

  const commands = Render.doRender(1)
  expect(commands).toEqual([['Viewlet.focusElementByName', 1, '[name="SearchValue"]']])
})

test('doRender - renders value when changed', () => {
  const oldState = Create.create(1, 0, 0, 0, 0, '', '')
  const newState = {
    ...oldState,
    value: 'newValue',
    inputSource: InputSource.Script,
  }
  SearchViewStates.set(1, oldState, newState)

  const commands = Render.doRender(1)
  expect(commands).toEqual([['Viewlet.send', 1, 'setValue', 'newValue', '[name="SearchValue"]']])
})
