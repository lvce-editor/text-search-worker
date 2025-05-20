import { expect, test } from '@jest/globals'
import * as SearchProgress from '../src/parts/SearchProgress/SearchProgress.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as Create from '../src/parts/Create/Create.ts'

test('getSearchProgress - calls ParentRpc with correct arguments', async () => {
  const mockProgress = {
    totalResults: 100,
    isComplete: false,
  }

  // @ts-ignore
  ParentRpc.invoke.mockResolvedValue(mockProgress)

  const state = Create.create(0, 0, 0, 0, 0, '/test', '/assets')
  const result = await SearchProgress.getSearchProgress(state)

  expect(result).toEqual(mockProgress)
  expect(ParentRpc.invoke).toHaveBeenCalledTimes(1)
  expect(ParentRpc.invoke).toHaveBeenCalledWith('SearchProcess.invoke', 'TextSearch.getProgress', {
    root: '/test',
    query: '',
    threads: 0,
    isCaseSensitive: false,
    useRegularExpression: false,
    exclude: '',
    include: '',
    assetDir: '/assets',
    platform: undefined,
  })
})

test('getSearchResults - calls ParentRpc with correct arguments', async () => {
  const mockResults = [
    { type: 1, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
    { type: 2, text: 'match1', start: 0, end: 6, lineNumber: 1 },
  ]

  // @ts-ignore
  ParentRpc.invoke.mockResolvedValue(mockResults)

  const state = Create.create(0, 0, 0, 0, 0, '/test', '/assets')
  const result = await SearchProgress.getSearchResults(state, 0, 2)

  expect(result).toEqual(mockResults)
  expect(ParentRpc.invoke).toHaveBeenCalledTimes(1)
  expect(ParentRpc.invoke).toHaveBeenCalledWith('SearchProcess.invoke', 'TextSearch.getResults', {
    root: '/test',
    query: '',
    threads: 0,
    isCaseSensitive: false,
    useRegularExpression: false,
    exclude: '',
    include: '',
    assetDir: '/assets',
    platform: undefined,
    startIndex: 0,
    endIndex: 2,
  })
})
