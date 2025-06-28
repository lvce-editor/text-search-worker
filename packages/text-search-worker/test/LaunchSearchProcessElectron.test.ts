import { expect, test, jest } from '@jest/globals'
import { MessagePortRpcParent } from '@lvce-editor/rpc'
import { MockRpc } from '@lvce-editor/rpc'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

import * as LaunchSearchProcessElectron from '../src/parts/LaunchSearchProcessElectron/LaunchSearchProcessElectron.ts'

const mockRpc = {
  invoke: jest.fn(),
}

// @ts-ignore
MessagePortRpcParent.create = jest.fn().mockResolvedValue(mockRpc)

test('launchSearchProcessElectron - creates message port and rpc', async () => {
  const mockInvokeAndTransfer = jest.fn()
  const mockRpcInstance = MockRpc.create({
    commandMap: {},
    invoke: jest.fn(),
    invokeAndTransfer: mockInvokeAndTransfer,
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpcInstance)

  await LaunchSearchProcessElectron.launchSearchProcessElectron()
  expect(MessagePortRpcParent.create).toHaveBeenCalledWith({
    messagePort: expect.anything(),
    commandMap: {},
    isMessagePortOpen: true,
  })
  expect(mockInvokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToElectron.sendMessagePortToElectron',
    expect.anything(),
    'HandleMessagePortForSearchProcess.handleMessagePortForSearchProcess',
  )
})

test('launchSearchProcessElectron - handles rpc creation error', async () => {
  const mockError = new Error('Failed to create RPC')
  // @ts-ignore
  MessagePortRpcParent.create.mockRejectedValue(mockError)

  const mockRpcInstance = MockRpc.create({
    commandMap: {},
    invoke: jest.fn(),
    invokeAndTransfer: jest.fn(),
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpcInstance)

  await expect(LaunchSearchProcessElectron.launchSearchProcessElectron()).rejects.toThrow('Failed to create RPC')
})

test('launchSearchProcessElectron - handles port transfer error', async () => {
  const mockError = new Error('Failed to transfer port')
  const mockInvokeAndTransfer = jest.fn(() => {
    throw mockError
  })
  const mockRpcInstance = MockRpc.create({
    commandMap: {},
    invoke: jest.fn(),
    invokeAndTransfer: mockInvokeAndTransfer,
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpcInstance)

  await expect(LaunchSearchProcessElectron.launchSearchProcessElectron()).rejects.toThrow('Failed to transfer port')
})
