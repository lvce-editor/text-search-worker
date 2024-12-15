import { expect, test, jest } from '@jest/globals'
import { WebSocketRpcParent } from '@lvce-editor/rpc'

jest.unstable_mockModule('../src/parts/Location/Location.ts', () => ({
  getHost: () => 'localhost:3000',
  getProtocol: () => 'http:',
}))

jest.unstable_mockModule('../src/parts/GetWebSocketUrl/GetWebSocketUrl.ts', () => ({
  getWebSocketUrl: jest.fn(() => 'ws://localhost:3000/search-process'),
}))

const LaunchSearchProcess = await import('../src/parts/LaunchSearchProcess/LaunchSearchProcess.ts')
const GetWebSocketUrl = await import('../src/parts/GetWebSocketUrl/GetWebSocketUrl.ts')

test('launchSearchProcess - creates websocket with correct url', async () => {
  const mockWebSocket = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }

  // @ts-ignore
  global.WebSocket = jest.fn(() => mockWebSocket)

  // @ts-ignore
  WebSocketRpcParent.create = jest.fn().mockResolvedValue({
    invoke: jest.fn(),
  })

  const rpc = await LaunchSearchProcess.launchSearchProcess()

  expect(GetWebSocketUrl.getWebSocketUrl).toHaveBeenCalledWith('search-process', 'localhost:3000', 'http:')
  expect(global.WebSocket).toHaveBeenCalledWith('ws://localhost:3000/search-process')
  expect(WebSocketRpcParent.create).toHaveBeenCalledWith({
    webSocket: mockWebSocket,
    commandMap: {},
  })
  expect(rpc).toBeDefined()
})

test('launchSearchProcess - handles websocket creation error', async () => {
  const mockError = new Error('Failed to connect')

  // @ts-ignore
  global.WebSocket = jest.fn(() => {
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
  global.WebSocket = jest.fn(() => mockWebSocket)

  const mockError = new Error('RPC creation failed')
  // @ts-ignore
  WebSocketRpcParent.create = jest.fn().mockRejectedValue(mockError)

  await expect(LaunchSearchProcess.launchSearchProcess()).rejects.toThrow('RPC creation failed')
})