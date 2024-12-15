import { expect, jest, test, beforeEach } from '@jest/globals'

const mockRpc = {
  invoke: jest.fn(),
}

const mockParentRpc = {
  setRpc: jest.fn(),
}

const mockWebWorkerRpcClient = {
  create: jest.fn(),
}

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('@lvce-editor/rpc', () => {
  return {
    WebWorkerRpcClient: mockWebWorkerRpcClient,
    WebSocketRpcParent: mockWebWorkerRpcClient,
    MessagePortRpcParent: mockWebWorkerRpcClient,
  }
})

jest.unstable_mockModule('../src/parts/ParentRpc/ParentRpc.ts', () => mockParentRpc)

const Listen = await import('../src/parts/Listen/Listen.ts')

test('listen - creates rpc client and sets it', async () => {
  // @ts-ignore
  mockWebWorkerRpcClient.create.mockResolvedValue(mockRpc)

  await Listen.listen()

  expect(mockWebWorkerRpcClient.create).toHaveBeenCalledWith({
    commandMap: expect.any(Object),
  })
  expect(mockParentRpc.setRpc).toHaveBeenCalledWith(mockRpc)
})
