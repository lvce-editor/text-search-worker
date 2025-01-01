import { expect, jest, test, beforeEach } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

const mockLaunchSearchProcessElectron = {
  launchSearchProcessElectron: jest.fn(),
}

jest.unstable_mockModule('../src/parts/LaunchSearchProcessElectron/LaunchSearchProcessElectron.ts', () => mockLaunchSearchProcessElectron)

const GetOrCreateSearchProcessElectron = await import('../src/parts/GetOrCreateSearchProcessElectron/GetOrCreateSearchProcessElectron.ts')

test('getOrCreate - creates new process when none exists', async () => {
  const mockRpc = { invoke: jest.fn() }
  // @ts-ignore
  mockLaunchSearchProcessElectron.launchSearchProcessElectron.mockResolvedValue(mockRpc)

  const result = await GetOrCreateSearchProcessElectron.getOrCreate()
  expect(result).toBe(mockRpc)
})

test.skip('getOrCreate - reuses existing process', async () => {
  const mockRpc = { invoke: jest.fn() }
  // @ts-ignore
  mockLaunchSearchProcessElectron.launchSearchProcessElectron.mockResolvedValue(mockRpc)

  const firstProcess = await GetOrCreateSearchProcessElectron.getOrCreate()
  const secondProcess = await GetOrCreateSearchProcessElectron.getOrCreate()

  expect(firstProcess).toBe(secondProcess)
  expect(mockLaunchSearchProcessElectron.launchSearchProcessElectron).toHaveBeenCalledTimes(1)
})

test.skip('getOrCreate - handles launch error', async () => {
  const mockError = new Error('Failed to launch process')
  // @ts-ignore
  mockLaunchSearchProcessElectron.launchSearchProcessElectron.mockRejectedValue(mockError)

  await expect(GetOrCreateSearchProcessElectron.getOrCreate()).rejects.toThrow('Failed to launch process')
})
