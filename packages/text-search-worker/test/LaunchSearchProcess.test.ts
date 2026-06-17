import { expect, jest, test } from '@jest/globals'
import { WebSocketRpcParent2 } from '@lvce-editor/rpc'
import * as LaunchSearchProcess from '../src/parts/LaunchSearchProcessNode/LaunchSearchProcessNode.ts'

// TODO add a helper function in rpc to mock websocket rpc
test.skip('launchSearchProcess - creates websocket with correct url', async () => {
  Object.defineProperty(globalThis, 'location', {
    configurable: true,
    value: {},
  })

  const mockWebSocket = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }

  Object.defineProperty(globalThis, 'WebSocket', {
    configurable: true,
    value: jest.fn(() => mockWebSocket),
  })

  // @ts-ignore
  WebSocketRpcParent2.create = jest.fn().mockResolvedValue({
    invoke: jest.fn(),
  })

  const rpc = await LaunchSearchProcess.launchSearchProcessNode()

  expect(WebSocketRpcParent2.create).toHaveBeenCalledWith({
    commandMap: {},
    // @ts-ignore
    type: 'search-process',
  })
  expect(rpc).toBeDefined()
})

test.skip('launchSearchProcess - handles websocket creation error', async () => {
  const mockError = new Error('Failed to connect')

  Object.defineProperty(globalThis, 'WebSocket', {
    configurable: true,
    value: jest.fn(() => {
      throw mockError
    }),
  })

  await expect(LaunchSearchProcess.launchSearchProcessNode()).rejects.toThrow('Failed to connect')
})

test.skip('launchSearchProcess - handles rpc creation error', async () => {
  const mockWebSocket = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }

  Object.defineProperty(globalThis, 'WebSocket', {
    configurable: true,
    value: jest.fn(() => mockWebSocket),
  })

  const mockError = new Error('RPC creation failed')
  // @ts-ignore
  WebSocketRpcParent2.create = jest.fn().mockRejectedValue(mockError)

  await expect(LaunchSearchProcess.launchSearchProcessNode()).rejects.toThrow('RPC creation failed')
})
