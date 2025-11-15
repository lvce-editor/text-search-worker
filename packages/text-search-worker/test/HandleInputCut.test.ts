import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleInputCut from '../src/parts/HandleInputCut/HandleInputCut.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'

test('handleInputCut - returns same state when name is not a selection key', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'test value',
  }

  const result = await HandleInputCut.handleInputCut(state, 'InvalidKey')
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test('handleInputCut - cuts text from SearchValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'hello world',
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      SearchValue: {
        start: 6,
        end: 11,
      },
    },
  }

  const result = await HandleInputCut.handleInputCut(state, InputName.SearchValue)
  expect(result.value).toBe('hello ')
  expect(result.selections.SearchValue.start).toBe(6)
  expect(result.selections.SearchValue.end).toBe(6)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'world']])
})

test('handleInputCut - cuts text from ReplaceValue', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    replacement: 'replace text',
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      ReplaceValue: {
        start: 0,
        end: 7,
      },
    },
  }

  const result = await HandleInputCut.handleInputCut(state, InputName.ReplaceValue)
  expect(result.replacement).toBe(' text')
  expect(result.selections.ReplaceValue.start).toBe(5)
  expect(result.selections.ReplaceValue.end).toBe(5)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'replace']])
})

test('handleInputCut - cuts text from FilesToInclude', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    includeValue: '*.ts,*.js',
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      FilesToInclude: {
        start: 4,
        end: 7,
      },
    },
  }

  const result = await HandleInputCut.handleInputCut(state, InputName.FilesToInclude)
  expect(result.includeValue).toBe('*.tsjs')
  expect(result.selections.FilesToInclude.start).toBe(6)
  expect(result.selections.FilesToInclude.end).toBe(6)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', ',*.']])
})

test('handleInputCut - cuts text from FilesToExclude', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    excludeValue: 'node_modules',
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      FilesToExclude: {
        start: 5,
        end: 12,
      },
    },
  }

  const result = await HandleInputCut.handleInputCut(state, InputName.FilesToExclude)
  expect(result.excludeValue).toBe('node_')
  expect(result.selections.FilesToExclude.start).toBe(5)
  expect(result.selections.FilesToExclude.end).toBe(5)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'modules']])
})

test('handleInputCut - cuts entire text when selection spans full length', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    value: 'full text',
    selections: {
      ...CreateDefaultState.createDefaultState().selections,
      SearchValue: {
        start: 0,
        end: 9,
      },
    },
  }

  const result = await HandleInputCut.handleInputCut(state, InputName.SearchValue)
  expect(result.value).toBe('')
  expect(result.selections.SearchValue.start).toBe(0)
  expect(result.selections.SearchValue.end).toBe(0)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', 'full text']])
})

test('handleInputCut - cuts empty selection', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ClipBoard.writeText': () => undefined,
  })

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

  const result = await HandleInputCut.handleInputCut(state, InputName.SearchValue)
  expect(result.value).toBe('test')
  expect(result.selections.SearchValue.start).toBe(4)
  expect(result.selections.SearchValue.end).toBe(4)
  expect(mockRpc.invocations).toEqual([['ClipBoard.writeText', '']])
})
