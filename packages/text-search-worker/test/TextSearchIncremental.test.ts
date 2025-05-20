import { expect, test } from '@jest/globals'
import * as TextSearchIncremental from '../src/parts/TextSearchIncremental/TextSearchIncremental.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('textSearch - calls ParentRpc with correct arguments', async () => {
  const mockResults = {
    results: [
      {
        type: TextSearchResultType.File,
        text: './index.txt',
        start: 0,
        end: 0,
        lineNumber: 0,
      },
      {
        type: TextSearchResultType.Match,
        text: '    <title>Document</title>\n',
        start: 208,
        end: 212,
        lineNumber: 1,
      },
    ],
    progress: {
      totalResults: 100,
      isComplete: false,
    },
  }

  // @ts-ignore
  ParentRpc.invoke.mockResolvedValue(mockResults)

  const root = '/test'
  const query = 'test'
  const options = { includePattern: '*.txt' } as any
  const assetDir = '/assets'
  const page = 0
  const resultsPerPage = 100

  const result = await TextSearchIncremental.textSearch(root, query, options, assetDir, undefined, page, resultsPerPage)

  expect(result).toEqual(mockResults)
  expect(ParentRpc.invoke).toHaveBeenCalledTimes(1)
  expect(ParentRpc.invoke).toHaveBeenCalledWith('SearchProcess.invoke', 'TextSearch.searchIncremental', {
    includePattern: '*.txt',
    ripGrepArgs: [
      '--hidden',
      '--no-require-git',
      '--smart-case',
      '--stats',
      '--json',
      '--threads',
      'undefined',
      '--ignore-case',
      '--fixed-strings',
      '--',
      'test',
      '.',
    ],
    searchDir: '/test',
    page: 0,
    resultsPerPage: 100,
  })
})
