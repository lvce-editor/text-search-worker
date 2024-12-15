import { expect, jest, test, beforeEach } from '@jest/globals'
import { MessagePortRpcParent } from '@lvce-editor/rpc'

beforeEach(() => {
  jest.resetAllMocks()
})

const mockPort1 = {
  start: jest.fn(),
}

const mockPort2 = {
  start: jest.fn(),
}

const mockPortTuple = {
  port1: mockPort1,
  port2: mockPort2,
}

jest.unstable_mockModule('../src/parts/GetPortTuple/GetPortTuple.ts', () => ({
  getPortTuple: jest.fn(() => mockPortTuple),
}))

jest.unstable_mockModule('../src/parts/ParentRpc/ParentRpc.ts', () => ({
  invokeAndTransfer: jest.fn(),
}))

const mockRpc = {
  invoke: jest.fn(),
}

// @ts-ignore
MessagePortRpcParent.create = jest.fn().mockResolvedValue(mockRpc)

const LaunchSearchProcessElectron = await import('../src/parts/LaunchSearchProcessElectron/LaunchSearchProcessElectron.ts')
const GetPortTuple = await import('../src/parts/GetPortTuple/GetPortTuple.ts')
const ParentRpc = await import('../src/parts/ParentRpc/ParentRpc.ts')

test('launchSearchProcessElectron - creates message port and rpc', async () => {
  const rpc = await LaunchSearchProcessElectron.launchSearchProcessElectron()

  expect(GetPortTuple.getPortTuple).toHaveBeenCalled()
  expect(MessagePortRpcParent.create).toHaveBeenCalledWith({
    messagePort: mockPort2,
    commandMap: {},
    isMessagePortOpen: true,
  })
  expect(ParentRpc.invokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToElectron.sendMessagePortToElectron',
    mockPort1,
    'HandleMessagePortForSearchProcess.handleMessagePortForSearchProcess',
  )
  expect(mockPort2.start).toHaveBeenCalled()
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
