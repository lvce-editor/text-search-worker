import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { replaceAll } from '../src/parts/ReplaceAll/ReplaceAll.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

test('replaceAll - replaces all matches and updates state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'BulkReplacement.applyBulkReplacement'() {},
    'Layout.handleWorkspaceRefresh'() {},
  })

  const state: SearchState = {
    ...CreateDefaultState.createDefaultState(),
    items: [
      { end: 0, lineNumber: 0, start: 0, text: 'file1.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 1, start: 0, text: 'match1', type: TextSearchResultType.Match },
      { end: 0, lineNumber: 2, start: 0, text: 'file2.txt', type: TextSearchResultType.File },
      { end: 0, lineNumber: 3, start: 0, text: 'match2', type: TextSearchResultType.Match },
    ],
    matchCount: 2,
    replacement: 'new-text',
    workspacePath: '/test',
  }

  const result = await replaceAll(state)

  expect(result).toEqual({
    ...state,
    items: [],
    listItems: [],
    maxLineY: 0,
    message: "Replaced 2 occurrences across 2 files with 'new-text'",
    minLineY: 0,
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
    ['Layout.handleWorkspaceRefresh'],
  ])
})
