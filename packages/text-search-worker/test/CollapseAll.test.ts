import { test, expect } from '@jest/globals'
import { collapseAll } from '../src/parts/CollapseAll/CollapseAll.ts'
import * as CreateDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('collapseAll returns the same state', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    assetDir: '/assets',
    height: 100,
    itemHeight: 22,
    platform: 1,
    uid: 42,
    value: 'test',
    width: 100,
    workspacePath: '/workspace',
  }

  const result = await collapseAll(state)

  expect(result).toBe(state)
})

test('collapseAll with different state', async () => {
  const state = {
    ...CreateDefaultState.createDefaultState(),
    assetDir: '/assets',
    height: 150,
    itemHeight: 30,
    platform: 2,
    replacement: 'replace',
    uid: 123,
    value: 'another test',
    width: 200,
    workspacePath: '/workspace',
  }

  const result = await collapseAll(state)

  expect(result).toBe(state)
})
