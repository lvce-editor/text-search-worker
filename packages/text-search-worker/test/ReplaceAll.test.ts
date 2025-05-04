import { expect, jest, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'
import { replaceAll } from '../src/parts/ReplaceAll/ReplaceAll.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

ParentRpc.set(mockRpc)

test('replaceAll - replaces all matches and updates state', async () => {
  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt', start: 0, end: 0, lineNumber: 0 },
      { type: TextSearchResultType.Match, text: 'match1', start: 0, end: 0, lineNumber: 1 },
      { type: TextSearchResultType.File, text: 'file2.txt', start: 0, end: 0, lineNumber: 2 },
      { type: TextSearchResultType.Match, text: 'match2', start: 0, end: 0, lineNumber: 3 },
    ],
    workspacePath: '/test',
    replacement: 'new-text',
    matchCount: 2,
  }

  const result = await replaceAll(state)

  expect(result).toEqual({
    ...state,
    items: [],
    listItems: [],
    minLineY: 0,
    maxLineY: 0,
    message: "Replaced 2 occurrences across 2 files with 'new-text'",
  })
  expect(mockRpc.invoke).toHaveBeenCalledWith('BulkReplacement.applyBulkReplacement', [
    {
      changes: [
        {
          endColumnIndex: 0,
          endRowIndex: 1,
          startColumnIndex: 0,
          startRowIndex: 0,
          text: 'new-text',
        },
      ],
      uri: '/test/file1.txt',
    },
    {
      changes: [
        {
          endColumnIndex: 0,
          endRowIndex: 3,
          startColumnIndex: 0,
          startRowIndex: 2,
          text: 'new-text',
        },
      ],
      uri: '/test/file2.txt',
    },
  ])
})
