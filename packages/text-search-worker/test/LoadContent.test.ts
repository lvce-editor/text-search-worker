import { expect, test } from '@jest/globals'
import type { SearchResult } from '../src/parts/SearchResult/SearchResult.ts'
import * as Create from '../src/parts/Create/Create.ts'
import { loadContent } from '../src/parts/LoadContent/LoadContent.ts'
import * as TextSearchProviders from '../src/parts/TextSearchProviders/TextSearchProviders.ts'

test('loadContent with saved value calls handleUpdate', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const savedState = {
    value: 'test',
    savedCollapsedPaths: [],
    threads: 4,
    replacement: 'replacement',
    flags: 1,
    includeValue: 'include',
    excludeValue: 'exclude',
  }

  TextSearchProviders.add({
    async ''(): Promise<readonly SearchResult[]> {
      return []
    },
  })

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    value: 'test',
    threads: 1,
    flags: 1,
    includeValue: 'include',
    excludeValue: 'exclude',
    loaded: true,
  })
})

test('loadContent without saved value returns state with loaded flag', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const savedState = {
    value: '',
    savedCollapsedPaths: [],
    threads: 4,
    replacement: '',
    flags: 1,
    includeValue: '',
    excludeValue: '',
  }

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    threads: 1,
    flags: 1,
    loaded: true,
  })
})

test('loadContent with null savedState', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const savedState = null

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    loaded: true,
  })
})

test('loadContent with undefined savedState', async () => {
  const state = Create.create(0, 0, 0, 0, 0, '', '')
  const savedState = undefined

  const result = await loadContent(state, savedState)

  expect(result).toMatchObject({
    loaded: true,
  })
})
