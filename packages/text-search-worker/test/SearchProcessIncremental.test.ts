import { expect, test } from '@jest/globals'
import * as SearchProcessIncremental from '../src/parts/SearchProcessIncremental/SearchProcessIncremental.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('search - returns paginated results and progress', async () => {
  const mockProcess = {
    stdout: [
      Buffer.from(
        JSON.stringify({
          type: 'begin',
          data: {
            path: { text: 'file1.txt' },
          },
        }) +
          '\n' +
          JSON.stringify({
            type: 'match',
            data: {
              lines: { text: 'match1' },
              submatches: [{ start: 0, end: 6 }],
              line_number: 1,
            },
          }) +
          '\n' +
          JSON.stringify({
            type: 'begin',
            data: {
              path: { text: 'file2.txt' },
            },
          }) +
          '\n' +
          JSON.stringify({
            type: 'match',
            data: {
              lines: { text: 'match2' },
              submatches: [{ start: 0, end: 6 }],
              line_number: 1,
            },
          }),
      ),
    ],
    exitCode: Promise.resolve(0),
  }

  // @ts-ignore
  jest.spyOn(require('child_process'), 'spawn').mockReturnValue(mockProcess)

  const options = {
    ripGrepArgs: ['--json', 'test'],
    searchDir: '/test',
    page: 0,
    resultsPerPage: 2,
    scheme: 'file',
    root: '/test',
    query: 'test',
    assetDir: '/assets',
    threads: 0,
    isCaseSensitive: false,
    useRegularExpression: false,
    exclude: '',
    include: '',
    matchWholeWord: false,
    flags: 0,
  }

  const result = await SearchProcessIncremental.search(options)

  expect(result).toEqual({
    results: [
      {
        type: TextSearchResultType.File,
        text: 'file1.txt',
        start: 0,
        end: 0,
        lineNumber: 0,
      },
      {
        type: TextSearchResultType.Match,
        text: 'match1',
        start: 0,
        end: 6,
        lineNumber: 1,
      },
    ],
    progress: {
      totalResults: 2,
      isComplete: true,
    },
  })
})
