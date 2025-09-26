import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import { handleUpdateFull } from '../src/parts/HandleUpdateFull/HandleUpdateFull.ts'
import { add } from '../src/parts/TextSearchProviders/TextSearchProviders.ts'

test('handleUpdateFull - sets limitHit to true when search hits limit', async () => {
  RendererWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon'],
  })

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    workspacePath: '/test',
    value: 'test',
    itemHeight: 20,
    height: 500,
    headerHeight: 40,
    minimumSliderSize: 20,
    flags: 0,
    threads: 0,
    includeValue: '',
    excludeValue: '',
    assetDir: '',
    platform: 0,
  }
  const update = { value: 'test' }
  const searchResults = [
    { text: 'file1.txt', type: 1, start: 0, end: 0, lineNumber: 0 },
    { text: 'match1', type: 2, start: 0, end: 6, lineNumber: 1 },
  ] as SearchResult[]

  add({
    async ''(): Promise<{ results: readonly SearchResult[]; limitHit: boolean }> {
      return {
        results: searchResults,
        limitHit: true,
      }
    },
  })

  const result = await handleUpdateFull(state, update)

  expect(result).toMatchObject({
    value: 'test',
    items: searchResults,
    listItems: searchResults,
    matchCount: 1,
    fileCount: 1,
    loaded: true,
    searchInputErrorMessage: '',
    limitHit: true,
    icons: ['file-icon'],
    maxLineY: 2,
    message: '1 result in 1 file',
  })
})

test('handleUpdateFull - sets limitHit to false when search does not hit limit', async () => {
  RendererWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['file-icon'],
  })

  const state: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    workspacePath: '/test',
    value: 'test',
    itemHeight: 20,
    height: 500,
    headerHeight: 40,
    minimumSliderSize: 20,
    flags: 0,
    threads: 0,
    includeValue: '',
    excludeValue: '',
    assetDir: '',
    platform: 0,
  }
  const update = { value: 'test' }
  const searchResults = [
    { text: 'file1.txt', type: 1, start: 0, end: 0, lineNumber: 0 },
    { text: 'match1', type: 2, start: 0, end: 6, lineNumber: 1 },
  ] as SearchResult[]

  add({
    async ''(): Promise<{ results: readonly SearchResult[]; limitHit: boolean }> {
      return {
        results: searchResults,
        limitHit: false,
      }
    },
  })

  const result = await handleUpdateFull(state, update)

  expect(result).toMatchObject({
    value: 'test',
    items: searchResults,
    listItems: searchResults,
    matchCount: 1,
    fileCount: 1,
    loaded: true,
    searchInputErrorMessage: '',
    limitHit: false,
    icons: ['file-icon'],
    maxLineY: 2,
    message: '1 result in 1 file',
  })
})
