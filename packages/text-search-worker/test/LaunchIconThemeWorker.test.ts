import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as LaunchIconThemeWorker from '../src/parts/LaunchIconThemeWorker/LaunchIconThemeWorker.ts'

test('launchIconThemeWorker - creates rpc and calls sendMessagePortToIconThemeWorker', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker': () => undefined,
  })

  const rpc = await LaunchIconThemeWorker.launchIconThemeWorker()

  expect(rpc).toBeDefined()
  expect(typeof rpc).toBe('object')
  const expectedArray = ['SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker', expect.anything(), 'IconTheme.handleMessagePort', 0]
  expect(mockRpc.invocations).toEqual([expectedArray])
})

test('launchIconThemeWorker - handles error when sendMessagePortToIconThemeWorker fails', async () => {
  const mockError = new Error('Failed to transfer port')
  using mockRpc = RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker': () => {
      throw mockError
    },
  })

  await expect(LaunchIconThemeWorker.launchIconThemeWorker()).rejects.toThrow('Failed to transfer port')
  const expectedArray = ['SendMessagePortToExtensionHostWorker.sendMessagePortToIconThemeWorker', expect.anything(), 'IconTheme.handleMessagePort', 0]
  expect(mockRpc.invocations).toEqual([expectedArray])
})
