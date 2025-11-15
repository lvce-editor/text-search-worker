import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderSelections } from '../src/parts/RenderSelections/RenderSelections.ts'

test('renderSelections - returns empty array when states are the same', () => {
  const oldState: SearchState = {
    ...CreateDefaultState.createDefaultState(),
  }

  const newState: SearchState = {
    ...oldState,
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})

test('renderSelections - returns empty array when SearchValue selection changes', () => {
  const oldState: SearchState = {
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

  const newState: SearchState = {
    ...oldState,
    selections: {
      ...oldState.selections,
      SearchValue: {
        start: 5,
        end: 10,
      },
    },
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})

test('renderSelections - returns empty array when ReplaceValue selection changes', () => {
  const oldState: SearchState = {
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

  const newState: SearchState = {
    ...oldState,
    selections: {
      ...oldState.selections,
      ReplaceValue: {
        start: 2,
        end: 8,
      },
    },
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})

test('renderSelections - returns empty array when FilesToInclude selection changes', () => {
  const oldState: SearchState = {
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

  const newState: SearchState = {
    ...oldState,
    selections: {
      ...oldState.selections,
      FilesToInclude: {
        start: 1,
        end: 5,
      },
    },
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})

test('renderSelections - returns empty array when FilesToExclude selection changes', () => {
  const oldState: SearchState = {
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

  const newState: SearchState = {
    ...oldState,
    selections: {
      ...oldState.selections,
      FilesToExclude: {
        start: 3,
        end: 7,
      },
    },
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})

test('renderSelections - returns empty array when multiple selections change', () => {
  const oldState: SearchState = {
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

  const newState: SearchState = {
    ...oldState,
    selections: {
      SearchValue: {
        start: 1,
        end: 3,
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
        start: 5,
        end: 10,
      },
    },
  }

  const result = renderSelections(oldState, newState)
  expect(result).toEqual([])
})
