import { expect, test, jest } from '@jest/globals'
import { MessagePortRpcParent } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as LaunchSearchProcessElectron from '../src/parts/LaunchSearchProcessElectron/LaunchSearchProcessElectron.ts'

const mockRpc = {
  invoke: jest.fn(),
}

// @ts-ignore
MessagePortRpcParent.create = jest.fn().mockResolvedValue(mockRpc)

test.skip('launchSearchProcessElectron - creates message port and rpc', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToElectron.sendMessagePortToElectron': () => undefined,
  })

  await LaunchSearchProcessElectron.launchSearchProcessElectron()
  expect(MessagePortRpcParent.create).toHaveBeenCalledWith({
    messagePort: expect.anything(),
    commandMap: {},
    isMessagePortOpen: true,
  })
  expect(mockRpc.invocations).toEqual([['SendMessagePortToElectron.sendMessagePortToElectron', expect.anything()]])
})

test.skip('launchSearchProcessElectron - handles rpc creation error', async () => {
  const mockError = new Error('Failed to create RPC')
  // @ts-ignore
  MessagePortRpcParent.create.mockRejectedValue(mockError)

  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToElectron.sendMessagePortToElectron': () => undefined,
  })

  await expect(LaunchSearchProcessElectron.launchSearchProcessElectron()).rejects.toThrow('Failed to create RPC')
  expect(mockRpc.invocations).toEqual([])
})

test.skip('launchSearchProcessElectron - handles port transfer error', async () => {
  const mockError = new Error('Failed to transfer port')
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToElectron.sendMessagePortToElectron': () => {
      throw mockError
    },
  })

  await expect(LaunchSearchProcessElectron.launchSearchProcessElectron()).rejects.toThrow('Failed to transfer port')
  expect(mockRpc.invocations).toEqual([['SendMessagePortToElectron.sendMessagePortToElectron', expect.anything()]])
})
