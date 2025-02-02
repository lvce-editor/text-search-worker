import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as Diff from '../src/parts/Diff/Diff.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

test('doRender - no changes returns empty commands', () => {
  const uid = 1
  Create.create(uid, 0, 0, 0, 0, '', '')
  const { oldState } = SearchViewStates.get(uid)
  const newState = oldState
  expect(Diff.diff(oldState, newState)).toEqual([])
})

test.skip('doRender - value change', () => {
  const uid = 1
  Create.create(uid, 0, 0, 0, 0, '', '')
  const { oldState } = SearchViewStates.get(uid)
  const newState: SearchState = {
    ...oldState,
    value: 'a',
  }
  expect(Diff.diff(oldState, newState)).toEqual([DiffType.RenderValue])
})

test.skip('doRender - include value change', () => {
  const uid = 1
  Create.create(uid, 0, 0, 0, 0, '', '')
  const { oldState } = SearchViewStates.get(uid)
  const newState: SearchState = {
    ...oldState,
    includeValue: 'a',
  }
  expect(Diff.diff(oldState, newState)).toEqual([DiffType.RenderIncludeValue])
})

test.skip('doRender - exclude value change', () => {
  const uid = 1
  Create.create(uid, 0, 0, 0, 0, '', '')
  const { oldState } = SearchViewStates.get(uid)
  const newState: SearchState = {
    ...oldState,
    excludeValue: 'a',
  }
  expect(Diff.diff(oldState, newState)).toEqual([DiffType.RenderExcludeValue])
})
