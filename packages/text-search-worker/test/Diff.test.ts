import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as Diff from '../src/parts/Diff/Diff.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'
import * as SearchViewStates from '../src/parts/SearchViewStates/SearchViewStates.ts'

test('diff - no changes', () => {
  const uid = 1
  Create.create(uid, 0, 0, 0, 0, '', '')
  const { oldState } = SearchViewStates.get(uid)
  const newState = oldState
  expect(Diff.diff(oldState, newState)).toEqual([])
})

test('diff - value change', () => {
  const uid = 1
  Create.create(uid, 0, 0, 0, 0, '', '')
  const { oldState } = SearchViewStates.get(uid)
  const newState: SearchState = {
    ...oldState,
    value: 'a',
    inputSource: InputSource.Script,
  }
  expect(Diff.diff(oldState, newState)).toEqual([DiffType.RenderValue])
})

test('diff - include value change', () => {
  const uid = 1
  Create.create(uid, 0, 0, 0, 0, '', '')
  const { oldState } = SearchViewStates.get(uid)
  const newState: SearchState = {
    ...oldState,
    includeValue: 'a',
    inputSource: InputSource.Script,
  }
  expect(Diff.diff(oldState, newState)).toEqual([DiffType.RenderIncludeValue])
})

test('diff - exclude value change', () => {
  const uid = 1
  Create.create(uid, 0, 0, 0, 0, '', '')
  const { oldState } = SearchViewStates.get(uid)
  const newState: SearchState = {
    ...oldState,
    excludeValue: 'a',
    inputSource: InputSource.Script,
  }
  expect(Diff.diff(oldState, newState)).toEqual([DiffType.RenderExcludeValue])
})
