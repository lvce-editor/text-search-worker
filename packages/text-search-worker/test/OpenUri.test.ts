import { expect, test } from '@jest/globals'
import * as OpenUri from '../src/parts/OpenUri/OpenUri.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('openUri - without options', async () => {
  RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })

  await OpenUri.openUri('/test/file.txt')
})

test('openUri - with preview', async () => {
  RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })

  await OpenUri.openUri('/test/file.txt', true)
})

test('openUri - with options', async () => {
  RendererWorker.registerMockRpc({
    'Main.openUri': () => undefined,
  })

  const options = {
    selections: new Uint32Array([1, 0, 1, 0]),
  }
  await OpenUri.openUri('/test/file.txt', false, options)
})

test('openUri - error', async () => {
  RendererWorker.registerMockRpc({
    'Main.openUri': () => {
      throw new Error('Failed to open file')
    },
  })

  await expect(OpenUri.openUri('/test/file.txt')).rejects.toThrow('Failed to open file')
})
