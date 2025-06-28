import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as GetOrCreateSearchProcess from '../src/parts/GetOrCreateSearchProcess/GetOrCreateSearchProcess.ts'

let LaunchSearchProcess: any

test('getOrCreate - creates new process when none exists', async () => {
  // @ts-ignore
  globalThis.location = {}
  // @ts-ignore
  globalThis.WebSocket = class {
    addEventListener(event: string, fn: any): void {
      if (event === 'open') {
        fn()
      }
    }
    removeEventListener(): void {}
  }
  GetOrCreateSearchProcess.reset()
  const result = await GetOrCreateSearchProcess.getOrCreate()
  expect(result).toBeDefined()
})

test.skip('getOrCreate - reuses existing process', async () => {
  const mockRpc = MockRpc.create({ commandMap: {}, invoke: () => 'mock' })
  Object.defineProperty(LaunchSearchProcess, 'launchSearchProcess', {
    value: () => Promise.resolve(mockRpc),
    writable: true,
  })
  const firstProcess = await GetOrCreateSearchProcess.getOrCreate()
  const secondProcess = await GetOrCreateSearchProcess.getOrCreate()
  expect(firstProcess).toBe(secondProcess)
})

test.skip('getOrCreate - handles launch error', async () => {
  Object.defineProperty(LaunchSearchProcess, 'launchSearchProcess', {
    value: () => Promise.reject(new Error('Failed to launch process')),
    writable: true,
  })
  await expect(GetOrCreateSearchProcess.getOrCreate()).rejects.toThrow('Failed to launch process')
})
