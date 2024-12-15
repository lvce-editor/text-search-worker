import { expect, jest, test, beforeEach } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

const mockRpc = {
  invoke: jest.fn(),
}

const mockGetOrCreateSearchProcessElectron = {
  getOrCreate: jest.fn(),
}

jest.unstable_mockModule(
  '../src/parts/GetOrCreateSearchProcessElectron/GetOrCreateSearchProcessElectron.ts',
  () => mockGetOrCreateSearchProcessElectron,
)

const SearchProcessElectron = await import('../src/parts/SearchProcessElectron/SearchProcessElectron.ts')

test('invoke - forwards call to rpc', async () => {
  mockGetOrCreateSearchProcessElectron.getOrCreate.mockResolvedValue(mockRpc)
  mockRpc.invoke.mockResolvedValue('test result')

  const result = await SearchProcessElectron.invoke('test.method', 'arg1', 'arg2')

  expect(mockGetOrCreateSearchProcessElectron.getOrCreate).toHaveBeenCalled()
  expect(mockRpc.invoke).toHaveBeenCalledWith('test.method', 'arg1', 'arg2')
  expect(result).toBe('test result')
})

test('invoke - handles rpc error', async () => {
  mockGetOrCreateSearchProcessElectron.getOrCreate.mockResolvedValue(mockRpc)
  mockRpc.invoke.mockRejectedValue(new Error('rpc error'))

  await expect(SearchProcessElectron.invoke('test.method')).rejects.toThrow('rpc error')
})

test('invoke - handles getOrCreate error', async () => {
  mockGetOrCreateSearchProcessElectron.getOrCreate.mockRejectedValue(new Error('failed to create'))

  await expect(SearchProcessElectron.invoke('test.method')).rejects.toThrow('failed to create')
})
