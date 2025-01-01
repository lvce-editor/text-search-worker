import { expect, jest, test, beforeEach } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

const mockRpc = {
  invoke: jest.fn(),
}

const mockGetOrCreateSearchProcess = {
  getOrCreate: jest.fn(),
}

jest.unstable_mockModule('../src/parts/GetOrCreateSearchProcess/GetOrCreateSearchProcess.ts', () => mockGetOrCreateSearchProcess)

const SearchProcess = await import('../src/parts/SearchProcess/SearchProcess.ts')

test('invoke - forwards call to rpc', async () => {
  // @ts-ignore
  mockGetOrCreateSearchProcess.getOrCreate.mockResolvedValue(mockRpc)
  // @ts-ignore
  mockRpc.invoke.mockResolvedValue('test result')

  const result = await SearchProcess.invoke('test.method', 'arg1', 'arg2')

  expect(mockGetOrCreateSearchProcess.getOrCreate).toHaveBeenCalled()
  expect(mockRpc.invoke).toHaveBeenCalledWith('test.method', 'arg1', 'arg2')
  expect(result).toBe('test result')
})

test('invoke - handles rpc error', async () => {
  // @ts-ignore
  mockGetOrCreateSearchProcess.getOrCreate.mockResolvedValue(mockRpc)
  // @ts-ignore
  mockRpc.invoke.mockRejectedValue(new Error('rpc error'))

  await expect(SearchProcess.invoke('test.method')).rejects.toThrow('rpc error')
})

test('invoke - handles getOrCreate error', async () => {
  // @ts-ignore
  mockGetOrCreateSearchProcess.getOrCreate.mockRejectedValue(new Error('failed to create process'))

  await expect(SearchProcess.invoke('test.method')).rejects.toThrow('failed to create process')
})
