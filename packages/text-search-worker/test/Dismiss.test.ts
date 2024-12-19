import { expect, jest, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as TextSearchResultType from '../src/parts/TextSearchResultType/TextSearchResultType.ts'

const mockViewletSearchStatusMessage = {
  getStatusMessage: jest.fn().mockReturnValue('mock message'),
}

jest.unstable_mockModule('../src/parts/SearchStatusMessage/SearchStatusMessage.ts', () => ({
  getStatusMessage: mockViewletSearchStatusMessage.getStatusMessage,
}))

test('dismissItem - no focused item', async () => {
  const { dismissItem } = await import('../src/parts/Dismiss/Dismiss.ts')

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    listFocusedIndex: -1,
  }

  const result = dismissItem(state)
  expect(result).toBe(state)
})

test('dismissItem - dismiss file item', async () => {
  const { dismissItem } = await import('../src/parts/Dismiss/Dismiss.ts')

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt' },
      { type: TextSearchResultType.Match, text: 'match1' },
      { type: TextSearchResultType.File, text: 'file2.txt' },
    ],
    listFocusedIndex: 0,
    fileCount: 2,
    matchCount: 1,
  }

  const result = dismissItem(state)
  expect(result.items).toHaveLength(1)
  expect(result.fileCount).toBe(1)
  expect(result.matchCount).toBe(0)
  expect(result.listFocusedIndex).toBe(0)
})

test('dismissItem - dismiss match item', async () => {
  const { dismissItem } = await import('../src/parts/Dismiss/Dismiss.ts')

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    items: [
      { type: TextSearchResultType.File, text: 'file1.txt' },
      { type: TextSearchResultType.Match, text: 'match1' },
      { type: TextSearchResultType.Match, text: 'match2' },
    ],
    listFocusedIndex: 1,
    fileCount: 1,
    matchCount: 2,
  }

  const result = dismissItem(state)
  expect(result.items).toHaveLength(2)
  expect(result.fileCount).toBe(1)
  expect(result.matchCount).toBe(1)
  expect(result.listFocusedIndex).toBe(1)
})
