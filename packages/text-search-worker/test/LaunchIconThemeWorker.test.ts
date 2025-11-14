import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as LaunchIconThemeWorker from '../src/parts/LaunchIconThemeWorker/LaunchIconThemeWorker.ts'

test('launchIconThemeWorker - creates rpc and calls sendMessagePortToIconThemeWorker', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker': () => undefined,
  })

  const rpc = await LaunchIconThemeWorker.launchIconThemeWorker()

  expect(rpc).toBeDefined()
  expect(typeof rpc).toBe('object')
  expect(mockRpc.invocations.length).toBe(1)
  expect(mockRpc.invocations[0][0]).toBe('SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker')
  expect(mockRpc.invocations[0][1]).toBeInstanceOf(MessagePort)
  expect(mockRpc.invocations[0][2]).toBe('IconTheme.handleMessagePort')
})

test('launchIconThemeWorker - handles error when sendMessagePortToIconThemeWorker fails', async () => {
  const mockError = new Error('Failed to transfer port')
  const mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker': () => {
      throw mockError
    },
  })

  await expect(LaunchIconThemeWorker.launchIconThemeWorker()).rejects.toThrow('Failed to transfer port')
  expect(mockRpc.invocations.length).toBe(1)
  expect(mockRpc.invocations[0][0]).toBe('SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker')
  expect(mockRpc.invocations[0][1]).toBeInstanceOf(MessagePort)
  expect(mockRpc.invocations[0][2]).toBe('IconTheme.handleMessagePort')
})
