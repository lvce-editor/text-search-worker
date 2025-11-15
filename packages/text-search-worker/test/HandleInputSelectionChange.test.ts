import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleInputSelectionChange } from '../src/parts/HandleInputSelectionChange/HandleInputSelectionChange.ts'

test('handleInputSelectionChange returns state unchanged when selection name does not exist', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
  }

  const result = await handleInputSelectionChange(state, 'NonExistent', 5, 10)

  expect(result).toBe(state)
})

test('handleInputSelectionChange returns state unchanged when selection values are the same', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      SearchValue: {
        start: 5,
        end: 10,
      },
      ReplaceValue: {
        start: 0,
        end: 0,
      },
      FilesToInclude: {
        start: 0,
        end: 0,
      },
      FilesToExclude: {
        start: 0,
        end: 0,
      },
    },
  }

  const result = await handleInputSelectionChange(state, 'SearchValue', 5, 10)

  expect(result).toBe(state)
})

test('handleInputSelectionChange updates SearchValue selection', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      SearchValue: {
        start: 0,
        end: 0,
      },
      ReplaceValue: {
        start: 0,
        end: 0,
      },
      FilesToInclude: {
        start: 0,
        end: 0,
      },
      FilesToExclude: {
        start: 0,
        end: 0,
      },
    },
  }

  const result = await handleInputSelectionChange(state, 'SearchValue', 5, 10)

  expect(result).not.toBe(state)
  expect(result.selections.SearchValue).toEqual({
    start: 5,
    end: 10,
  })
  expect(result.selections.ReplaceValue).toBe(state.selections.ReplaceValue)
  expect(result.selections.FilesToInclude).toBe(state.selections.FilesToInclude)
  expect(result.selections.FilesToExclude).toBe(state.selections.FilesToExclude)
})

test('handleInputSelectionChange updates ReplaceValue selection', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      SearchValue: {
        start: 0,
        end: 0,
      },
      ReplaceValue: {
        start: 2,
        end: 4,
      },
      FilesToInclude: {
        start: 0,
        end: 0,
      },
      FilesToExclude: {
        start: 0,
        end: 0,
      },
    },
  }

  const result = await handleInputSelectionChange(state, 'ReplaceValue', 7, 12)

  expect(result).not.toBe(state)
  expect(result.selections.ReplaceValue).toEqual({
    start: 7,
    end: 12,
  })
  expect(result.selections.SearchValue).toBe(state.selections.SearchValue)
  expect(result.selections.FilesToInclude).toBe(state.selections.FilesToInclude)
  expect(result.selections.FilesToExclude).toBe(state.selections.FilesToExclude)
})

test('handleInputSelectionChange updates FilesToInclude selection', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      SearchValue: {
        start: 0,
        end: 0,
      },
      ReplaceValue: {
        start: 0,
        end: 0,
      },
      FilesToInclude: {
        start: 1,
        end: 3,
      },
      FilesToExclude: {
        start: 0,
        end: 0,
      },
    },
  }

  const result = await handleInputSelectionChange(state, 'FilesToInclude', 8, 15)

  expect(result).not.toBe(state)
  expect(result.selections.FilesToInclude).toEqual({
    start: 8,
    end: 15,
  })
  expect(result.selections.SearchValue).toBe(state.selections.SearchValue)
  expect(result.selections.ReplaceValue).toBe(state.selections.ReplaceValue)
  expect(result.selections.FilesToExclude).toBe(state.selections.FilesToExclude)
})

test('handleInputSelectionChange updates FilesToExclude selection', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    selections: {
      SearchValue: {
        start: 0,
        end: 0,
      },
      ReplaceValue: {
        start: 0,
        end: 0,
      },
      FilesToInclude: {
        start: 0,
        end: 0,
      },
      FilesToExclude: {
        start: 3,
        end: 6,
      },
    },
  }

  const result = await handleInputSelectionChange(state, 'FilesToExclude', 20, 25)

  expect(result).not.toBe(state)
  expect(result.selections.FilesToExclude).toEqual({
    start: 20,
    end: 25,
  })
  expect(result.selections.SearchValue).toBe(state.selections.SearchValue)
  expect(result.selections.ReplaceValue).toBe(state.selections.ReplaceValue)
  expect(result.selections.FilesToInclude).toBe(state.selections.FilesToInclude)
})

test('handleInputSelectionChange preserves other state properties', async () => {
  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test-value',
    uid: 42,
    selections: {
      SearchValue: {
        start: 0,
        end: 0,
      },
      ReplaceValue: {
        start: 0,
        end: 0,
      },
      FilesToInclude: {
        start: 0,
        end: 0,
      },
      FilesToExclude: {
        start: 0,
        end: 0,
      },
    },
  }

  const result = await handleInputSelectionChange(state, 'SearchValue', 1, 2)

  expect(result.value).toBe(state.value)
  expect(result.uid).toBe(state.uid)
  expect(result.selections.SearchValue).not.toBe(state.selections.SearchValue)
})
