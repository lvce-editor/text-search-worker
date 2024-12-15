import { expect, jest, test, beforeEach } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

const mockLaunchSearchProcess = {
  launchSearchProcess: jest.fn(),
}

jest.unstable_mockModule('../src/parts/LaunchSearchProcess/LaunchSearchProcess.ts', () => mockLaunchSearchProcess)

const GetOrCreateSearchProcess = await import('../src/parts/GetOrCreateSearchProcess/GetOrCreateSearchProcess.ts')

test('getOrCreate - creates new process when none exists', async () => {
  const mockRpc = { invoke: jest.fn() }
  // @ts-ignore
  mockLaunchSearchProcess.launchSearchProcess.mockResolvedValue(mockRpc)

  const result = await GetOrCreateSearchProcess.getOrCreate()
  expect(result).toBe(mockRpc)
  expect(mockLaunchSearchProcess.launchSearchProcess).toHaveBeenCalledTimes(1)
})

test('getOrCreate - reuses existing process', async () => {
  const mockRpc = { invoke: jest.fn() }
  // @ts-ignore
  mockLaunchSearchProcess.launchSearchProcess.mockResolvedValue(mockRpc)

  const firstProcess = await GetOrCreateSearchProcess.getOrCreate()
  const secondProcess = await GetOrCreateSearchProcess.getOrCreate()

  expect(firstProcess).toBe(secondProcess)
  expect(mockLaunchSearchProcess.launchSearchProcess).toHaveBeenCalledTimes(1)
})

test('getOrCreate - handles launch error', async () => {
  // @ts-ignore
  mockLaunchSearchProcess.launchSearchProcess.mockRejectedValue(new Error('Failed to launch process'))

  await expect(GetOrCreateSearchProcess.getOrCreate()).rejects.toThrow('Failed to launch process')
})
