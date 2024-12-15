import { expect, jest, test, beforeEach } from '@jest/globals'
import { MessagePortRpcParent } from '@lvce-editor/rpc'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/ParentRpc/ParentRpc.ts', () => ({
  invokeAndTransfer: jest.fn(),
}))

const mockRpc = {
  invoke: jest.fn(),
}

// @ts-ignore
MessagePortRpcParent.create = jest.fn().mockResolvedValue(mockRpc)

const LaunchSearchProcessElectron = await import('../src/parts/LaunchSearchProcessElectron/LaunchSearchProcessElectron.ts')
const ParentRpc = await import('../src/parts/ParentRpc/ParentRpc.ts')

test('launchSearchProcessElectron - creates message port and rpc', async () => {
  const rpc = await LaunchSearchProcessElectron.launchSearchProcessElectron()
  expect(MessagePortRpcParent.create).toHaveBeenCalledWith({
    messagePort: expect.anything(),
    commandMap: {},
    isMessagePortOpen: true,
  })
  expect(ParentRpc.invokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToElectron.sendMessagePortToElectron',
    expect.anything(),
    'HandleMessagePortForSearchProcess.handleMessagePortForSearchProcess',
  )
  expect(rpc).toBe(mockRpc)
})

test('launchSearchProcessElectron - handles rpc creation error', async () => {
  const mockError = new Error('Failed to create RPC')
  // @ts-ignore
  MessagePortRpcParent.create.mockRejectedValue(mockError)

  await expect(LaunchSearchProcessElectron.launchSearchProcessElectron()).rejects.toThrow('Failed to create RPC')
})

test('launchSearchProcessElectron - handles port transfer error', async () => {
  const mockError = new Error('Failed to transfer port')
  // @ts-ignore
  ParentRpc.invokeAndTransfer.mockRejectedValue(mockError)

  await expect(LaunchSearchProcessElectron.launchSearchProcessElectron()).rejects.toThrow('Failed to transfer port')
})
