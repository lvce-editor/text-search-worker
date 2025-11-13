import { expect, test } from '@jest/globals'
import type { Rpc } from '@lvce-editor/rpc'
import { WebSocketRpcParent2 } from '@lvce-editor/rpc'
import * as LaunchSearchProcess from '../src/parts/LaunchSearchProcessNode/LaunchSearchProcessNode.ts'

// TODO add a helper function in rpc to mock websocket rpc
test('launchSearchProcess - creates websocket with correct url', async () => {
  // @ts-ignore
  globalThis.location = {}

  const mockWebSocket = {
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  }

  // @ts-ignore
  globalThis.WebSocket = () => mockWebSocket

  let createCalledWith: Parameters<typeof WebSocketRpcParent2.create> | undefined
  const mockRpc: Rpc = {
    invoke: () => {
      throw new Error('not implemented')
    },
  }
  // @ts-ignore
  WebSocketRpcParent2.create = async (...args) => {
    createCalledWith = args
    return mockRpc
  }

  const rpc = await LaunchSearchProcess.launchSearchProcessNode()

  expect(createCalledWith).toEqual([
    {
      commandMap: {},
      // @ts-ignore
      type: 'search-process',
    },
  ])
  expect(rpc).toBeDefined()
})

test.skip('launchSearchProcess - handles websocket creation error', async () => {
  const mockError = new Error('Failed to connect')

  // @ts-ignore
  globalThis.WebSocket = () => {
    throw mockError
  }

  await expect(LaunchSearchProcess.launchSearchProcessNode()).rejects.toThrow('Failed to connect')
})

test('launchSearchProcess - handles rpc creation error', async () => {
  const mockWebSocket = {
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
  }

  // @ts-ignore
  globalThis.WebSocket = () => mockWebSocket

  const mockError = new Error('RPC creation failed')
  // @ts-ignore
  WebSocketRpcParent2.create = async () => {
    throw mockError
  }

  await expect(LaunchSearchProcess.launchSearchProcessNode()).rejects.toThrow('RPC creation failed')
})
