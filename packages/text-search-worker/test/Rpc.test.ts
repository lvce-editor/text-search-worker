import { beforeEach, expect, jest, test } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/IpcState/IpcState.ts', () => {
  return {
    get: jest.fn(() => {
      throw new Error('not implemented')
    }),
    set: jest.fn(() => {
      throw new Error('not implemented')
    }),
  }
})

jest.unstable_mockModule('../src/parts/JsonRpc/JsonRpc.ts', () => {
  return {
    invoke: jest.fn(() => {
      throw new Error('not implemented')
    }),
  }
})

const Rpc = await import('../src/parts/ParentRpc/ParentRpc.ts')
const IpcState = await import('../src/parts/IpcState/IpcState.ts')
const JsonRpc = await import('../src/parts/JsonRpc/JsonRpc.ts')

test('invoke - calls JsonRpc.invoke with correct parameters', async () => {
  const mockIpc = {
    send: jest.fn(),
    receive: jest.fn(),
  }
  // @ts-ignore
  IpcState.get.mockImplementation(() => mockIpc)
  // @ts-ignore
  JsonRpc.invoke.mockImplementation(() => 'test result')

  const result = await Rpc.invoke('test.method', 'param1', 'param2')

  expect(IpcState.get).toHaveBeenCalledTimes(1)
  expect(JsonRpc.invoke).toHaveBeenCalledWith(mockIpc, 'test.method', 'param1', 'param2')
  expect(result).toBe('test result')
})
