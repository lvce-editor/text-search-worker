import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { replaceAll } from '../src/parts/ReplaceAll/ReplaceAll.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('replaceAll - replaces all matches and updates state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'BulkReplacement.applyBulkReplacement'() {},
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
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
  expect(mockRpc.invocations).toEqual([
    [
      'BulkReplacement.applyBulkReplacement',
      [
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
      ],
    ],
  ])
})
