import { expect, test, jest } from '@jest/globals'
void jest
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as ReplaceAllAndPrompt from '../src/parts/ReplaceAllAndPrompt/ReplaceAllAndPrompt.ts'

test('replaceAllAndPrompt - user cancels prompt', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => false,
  })

  const result = await ReplaceAllAndPrompt.replaceAllAndPrompt('/test/workspace', [{ type: 'file', text: 'test.txt' }], 'replacement', 5, 2)

  expect(result).toBe(false)
  expect(mockRpc.invocations).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 5 occurrences across 2 files with 'replacement'",
      {
        title: 'Replace All',
        confirmMessage: 'Replace',
      },
    ],
  ])
})

test('replaceAllAndPrompt - user confirms prompt', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => true,
  })

  const result = await ReplaceAllAndPrompt.replaceAllAndPrompt('/test/workspace', [{ type: 'file', text: 'test.txt' }], 'replacement', 5, 2)

  expect(result).toBe(true)
  expect(mockRpc.invocations).toEqual([
    [
      'ConfirmPrompt.prompt',
      "Replace 5 occurrences across 2 files with 'replacement'",
      {
        title: 'Replace All',
        confirmMessage: 'Replace',
      },
    ],
  ])
})

test('replaceAllAndPrompt - validates input parameters', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  await expect(ReplaceAllAndPrompt.replaceAllAndPrompt(123 as any, [], 'replacement', 5, 2)).rejects.toThrow()
  expect(mockRpc.invocations).toEqual([])
})
