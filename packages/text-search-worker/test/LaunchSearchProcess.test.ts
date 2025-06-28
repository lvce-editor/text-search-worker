import { expect, jest, test } from '@jest/globals'
import { WebSocketRpcParent } from '@lvce-editor/rpc'
import * as LaunchSearchProcess from '../src/parts/LaunchSearchProcess/LaunchSearchProcess.ts'

// @ts-ignore
globalThis.location = {
  host: '',
  port: '3000',
}

test('launchSearchProcess - creates websocket with correct url', async () => {
  const mockWebSocket = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }

  // @ts-ignore
  globalThis.WebSocket = jest.fn(() => mockWebSocket)

  // @ts-ignore
  WebSocketRpcParent.create = jest.fn().mockResolvedValue({
    invoke: jest.fn(),
  })

  const rpc = await LaunchSearchProcess.launchSearchProcess()

  expect(WebSocketRpcParent.create).toHaveBeenCalledWith({
    // @ts-ignore
    webSocket: mockWebSocket,
    commandMap: {},
  })
  expect(rpc).toBeDefined()
})

test('launchSearchProcess - handles websocket creation error', async () => {
  const mockError = new Error('Failed to connect')

  // @ts-ignore
  globalThis.WebSocket = jest.fn(() => {
    throw mockError
  })

  await expect(LaunchSearchProcess.launchSearchProcess()).rejects.toThrow('Failed to connect')
})

test('launchSearchProcess - handles rpc creation error', async () => {
  const mockWebSocket = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }

  // @ts-ignore
  globalThis.WebSocket = jest.fn(() => mockWebSocket)

  const mockError = new Error('RPC creation failed')
  // @ts-ignore
  WebSocketRpcParent.create = jest.fn().mockRejectedValue(mockError)

  await expect(LaunchSearchProcess.launchSearchProcess()).rejects.toThrow('RPC creation failed')
})
