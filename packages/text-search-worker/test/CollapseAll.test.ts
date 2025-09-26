import { test, expect } from '@jest/globals'
import { collapseAll } from '../src/parts/CollapseAll/CollapseAll.ts'
import * as Create from '../src/parts/Create/Create.ts'

test('collapseAll returns the same state', async () => {
  const state = Create.create(42, 0, 0, 100, 100, '/workspace', '/assets', 22, 'test', '', 1)

  const result = await collapseAll(state)

  expect(result).toBe(state)
})

test.skip('collapseAll with different state', async () => {
  const state = Create.create(123, 0, 0, 200, 150, '/workspace', '/assets', 30, 'another test', 'replace', 2)

  const result = await collapseAll(state)

  expect(result).toBe(state)
})
