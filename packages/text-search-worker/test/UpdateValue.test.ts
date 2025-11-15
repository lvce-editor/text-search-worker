import { expect, test } from '@jest/globals'
import { InputSource } from '@lvce-editor/constants'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { updateValue } from '../src/parts/UpdateValue/UpdateValue.ts'

test('updateValue - updates SearchValue', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'old',
    inputSource: InputSource.User,
  }

  const result = updateValue(state, InputName.SearchValue, 'new value')

  expect(result.value).toBe('new value')
  expect(result.inputSource).toBe(InputSource.Script)
  expect(result.selections.SearchValue).toEqual({
    start: 9,
    end: 9,
  })
})

test('updateValue - updates ReplaceValue', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    replacement: 'old replacement',
    inputSource: InputSource.User,
  }

  const result = updateValue(state, InputName.ReplaceValue, 'new replacement')

  expect(result.replacement).toBe('new replacement')
  expect(result.inputSource).toBe(InputSource.Script)
  expect(result.selections.ReplaceValue).toEqual({
    start: 15,
    end: 15,
  })
})

test('updateValue - updates FilesToInclude', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    includeValue: '*.ts',
    inputSource: InputSource.User,
  }

  const result = updateValue(state, InputName.FilesToInclude, '*.js,*.ts')

  expect(result.includeValue).toBe('*.js,*.ts')
  expect(result.inputSource).toBe(InputSource.Script)
  expect(result.selections.FilesToInclude).toEqual({
    start: 9,
    end: 9,
  })
})

test('updateValue - updates FilesToExclude', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    excludeValue: 'node_modules',
    inputSource: InputSource.User,
  }

  const result = updateValue(state, InputName.FilesToExclude, 'node_modules,dist')

  expect(result.excludeValue).toBe('node_modules,dist')
  expect(result.inputSource).toBe(InputSource.Script)
  expect(result.selections.FilesToExclude).toEqual({
    start: 17,
    end: 17,
  })
})

test('updateValue - returns state unchanged for unknown input name', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test',
    inputSource: InputSource.User,
  }

  const result = updateValue(state, 'UnknownInput', 'new value')

  expect(result).toBe(state)
})

test('updateValue - updates selection when cursor is not at end', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test',
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      SearchValue: {
        start: 2,
        end: 2,
      },
    },
  }

  const result = updateValue(state, InputName.SearchValue, 'new value')

  expect(result.selections.SearchValue).toEqual({
    start: 9,
    end: 9,
  })
})

test('updateValue - does not update selection when cursor is already at end', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test',
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      SearchValue: {
        start: 4,
        end: 4,
      },
    },
  }

  const result = updateValue(state, InputName.SearchValue, 'test')

  expect(result.selections.SearchValue).toEqual({
    start: 4,
    end: 4,
  })
})

test('updateValue - preserves other state properties', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'old',
    replacement: 'old replacement',
    includeValue: '*.ts',
    excludeValue: 'node_modules',
    uid: 123,
    platform: 1,
  }

  const result = updateValue(state, InputName.SearchValue, 'new value')

  expect(result.uid).toBe(123)
  expect(result.platform).toBe(1)
  expect(result.replacement).toBe('old replacement')
  expect(result.includeValue).toBe('*.ts')
  expect(result.excludeValue).toBe('node_modules')
})

test('updateValue - handles empty string', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test',
  }

  const result = updateValue(state, InputName.SearchValue, '')

  expect(result.value).toBe('')
  expect(result.selections.SearchValue).toEqual({
    start: 0,
    end: 0,
  })
})

test('updateValue - handles selection for input name that does not exist in selections', () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
  }

  const result = updateValue(state, 'NonExistentInput', 'value')

  expect(result).toBe(state)
})
