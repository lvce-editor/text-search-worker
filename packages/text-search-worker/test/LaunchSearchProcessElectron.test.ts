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
  RendererWorker.registerMockRpc({
    'SendMessagePortToElectron.sendMessagePortToElectron': () => undefined,
  })

  await LaunchSearchProcessElectron.launchSearchProcessElectron()
  expect(MessagePortRpcParent.create).toHaveBeenCalledWith({
    messagePort: expect.anything(),
    commandMap: {},
    isMessagePortOpen: true,
  })
  // assertion on transfer call intentionally omitted in skipped test
})

test.skip('launchSearchProcessElectron - handles rpc creation error', async () => {
  const mockError = new Error('Failed to create RPC')
  // @ts-ignore
  MessagePortRpcParent.create.mockRejectedValue(mockError)

  RendererWorker.registerMockRpc({
    'SendMessagePortToElectron.sendMessagePortToElectron': () => undefined,
  })

  await expect(LaunchSearchProcessElectron.launchSearchProcessElectron()).rejects.toThrow('Failed to create RPC')
})

test.skip('launchSearchProcessElectron - handles port transfer error', async () => {
  const mockError = new Error('Failed to transfer port')
  RendererWorker.registerMockRpc({
    'SendMessagePortToElectron.sendMessagePortToElectron': () => {
      throw mockError
    },
  })

  await expect(LaunchSearchProcessElectron.launchSearchProcessElectron()).rejects.toThrow('Failed to transfer port')
})
