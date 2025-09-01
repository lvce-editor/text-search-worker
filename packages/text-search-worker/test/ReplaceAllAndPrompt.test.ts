import { expect, test, jest } from '@jest/globals'
import * as ReplaceAllAndPrompt from '../src/parts/ReplaceAllAndPrompt/ReplaceAllAndPrompt.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('replaceAllAndPrompt - user cancels prompt', async () => {
  const prompt = jest.fn(() => false)
  RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': prompt,
  })

  const result = await ReplaceAllAndPrompt.replaceAllAndPrompt('/test/workspace', [{ type: 'file', text: 'test.txt' }], 'replacement', 5, 2)

  expect(result).toBe(false)
  expect(prompt.mock.calls[0]).toEqual([
    "Replace 5 occurrences across 2 files with 'replacement'",
    {
      title: 'Replace All',
      confirmMessage: 'Replace',
    },
  ])
})

test('replaceAllAndPrompt - user confirms prompt', async () => {
  const prompt = jest.fn(() => true)
  RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': prompt,
  })

  const result = await ReplaceAllAndPrompt.replaceAllAndPrompt('/test/workspace', [{ type: 'file', text: 'test.txt' }], 'replacement', 5, 2)

  expect(result).toBe(true)
  expect(prompt.mock.calls[0]).toEqual([
    "Replace 5 occurrences across 2 files with 'replacement'",
    {
      title: 'Replace All',
      confirmMessage: 'Replace',
    },
  ])
})

test('replaceAllAndPrompt - validates input parameters', async () => {
  const mockInvoke = jest.fn((...args: readonly unknown[]) => {
    throw new Error(`unexpected method ${args[0]}`)
  })
  RendererWorker.registerMockRpc({})

  await expect(ReplaceAllAndPrompt.replaceAllAndPrompt(123 as any, [], 'replacement', 5, 2)).rejects.toThrow()
})
