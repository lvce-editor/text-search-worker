import { test, expect } from '@jest/globals'
import { collapseAll } from '../src/parts/CollapseAll/CollapseAll.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('collapseAll returns the same state', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    uid: 42,
    width: 100,
    height: 100,
    workspacePath: '/workspace',
    assetDir: '/assets',
    itemHeight: 22,
    value: 'test',
    platform: 1,
  }

  const result = await collapseAll(state)

  expect(result).toBe(state)
})

test('collapseAll with different state', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    uid: 123,
    width: 200,
    height: 150,
    workspacePath: '/workspace',
    assetDir: '/assets',
    itemHeight: 30,
    value: 'another test',
    replacement: 'replace',
    platform: 2,
  }

  const result = await collapseAll(state)

  expect(result).toBe(state)
})
