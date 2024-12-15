import { test, expect } from '@jest/globals'
import * as WebSocketProtocol from '../src/parts/WebSocketProtocol/WebSocketProtocol.ts'
import * as Protocol from '../src/parts/Protocol/Protocol.ts'

test('getWebSocketProtocol - returns wss: for https:', () => {
  expect(WebSocketProtocol.getWebSocketProtocol(Protocol.Https)).toBe(Protocol.Wss)
})

test('getWebSocketProtocol - returns ws: for http:', () => {
  expect(WebSocketProtocol.getWebSocketProtocol('http:')).toBe(Protocol.Ws)
})

test('getWebSocketProtocol - returns ws: for other protocols', () => {
  expect(WebSocketProtocol.getWebSocketProtocol('file:')).toBe(Protocol.Ws)
  expect(WebSocketProtocol.getWebSocketProtocol('ftp:')).toBe(Protocol.Ws)
})

test('getWebSocketProtocol - returns ws: for empty string', () => {
  expect(WebSocketProtocol.getWebSocketProtocol('')).toBe(Protocol.Ws)
})
