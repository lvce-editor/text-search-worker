import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'
import * as RenderActions from '../src/parts/RenderActions/RenderActions.ts'
import { SearchState } from '../src/parts/SearchState/SearchState.ts'

test('renderActions - returns empty array when states are same', () => {
  const state = Create.create(1, 0, 0, 0, 0, '', '')
  SearchViewStates.set(1, state, state)
  const result = RenderActions.renderActions(1)
  expect(result).toEqual([])
})

test('renderActions - returns virtual dom when states differ', () => {
  const oldState = Create.create(1, 0, 0, 0, 0, '', '')
  const newState: SearchState = {
    ...oldState,
    items: [
      {
        type: 1,
        start: 0,
        end: 0,
        lineNumber: 0,
        text: 'item1',
      },
    ],
  }
  SearchViewStates.set(1, oldState, newState)
  const result = RenderActions.renderActions(1)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    type: 4,
    className: 'Actions',
    role: 'toolbar',
    childCount: 0,
  })
})
