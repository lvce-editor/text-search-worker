import { expect, jest, test } from '@jest/globals'

const mockRpc = {
  invoke: jest.fn(),
}

jest.unstable_mockModule('../src/parts/Rpc/Rpc.ts', () => mockRpc)

test('replaceAllAndPrompt - user cancels prompt', async () => {
  const { replaceAllAndPrompt } = await import('../src/parts/ReplaceAllAndPrompt/ReplaceAllAndPrompt.ts')
  // @ts-ignore
  mockRpc.invoke.mockResolvedValue(false)

  const result = await replaceAllAndPrompt('/test/workspace', [{ type: 'file', text: 'test.txt' }], 'replacement', 5, 2)

  expect(result).toBe(false)
  expect(mockRpc.invoke).toHaveBeenCalledWith('ConfirmPrompt.prompt', "Replace 5 occurrences across 2 files with 'replacement'?", {
    title: 'Replace All',
    confirmMessage: 'Replace',
  })
})

test('replaceAllAndPrompt - user confirms prompt', async () => {
  const { replaceAllAndPrompt } = await import('../src/parts/ReplaceAllAndPrompt/ReplaceAllAndPrompt.ts')
  // @ts-ignore
  mockRpc.invoke.mockResolvedValue(true)

  const result = await replaceAllAndPrompt('/test/workspace', [{ type: 'file', text: 'test.txt' }], 'replacement', 5, 2)

  expect(result).toBe(true)
  expect(mockRpc.invoke).toHaveBeenCalledWith('ConfirmPrompt.prompt', "Replace 5 occurrences across 2 files with 'replacement'", {
    title: 'Replace All',
    confirmMessage: 'Replace',
  })
})

test('replaceAllAndPrompt - validates input parameters', async () => {
  const { replaceAllAndPrompt } = await import('../src/parts/ReplaceAllAndPrompt/ReplaceAllAndPrompt.ts')
  await expect(replaceAllAndPrompt(123 as any, [], 'replacement', 5, 2)).rejects.toThrow()
})
