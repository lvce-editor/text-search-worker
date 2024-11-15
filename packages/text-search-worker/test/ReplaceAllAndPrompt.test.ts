import { expect, jest, test } from '@jest/globals'
import * as ReplaceAllAndPrompt from '../src/parts/ReplaceAllAndPrompt/ReplaceAllAndPrompt.ts'

const mockCommand = {
  execute: jest.fn(),
}

jest.unstable_mockModule('../src/parts/Command/Command.ts', () => mockCommand)

test('replaceAllAndPrompt - user cancels prompt', async () => {
  // @ts-ignore
  mockCommand.execute.mockResolvedValue(false)
  const result = await ReplaceAllAndPrompt.replaceAllAndPrompt('/test/workspace', [{ type: 'file', text: 'test.txt' }], 'replacement', 5, 2)
  expect(result).toBe(false)
  expect(mockCommand.execute).toHaveBeenCalledWith('ConfirmPrompt.prompt', 'Replace 5 occurrences across 2 files with "replacement"?', {
    title: 'Replace All',
    confirmMessage: 'Replace',
  })
})

test('replaceAllAndPrompt - user confirms prompt', async () => {
  // @ts-ignore
  mockCommand.execute.mockResolvedValue(true)
  const result = await ReplaceAllAndPrompt.replaceAllAndPrompt('/test/workspace', [{ type: 'file', text: 'test.txt' }], 'replacement', 5, 2)
  expect(result).toBe(true)
  expect(mockCommand.execute).toHaveBeenCalledWith('ConfirmPrompt.prompt', 'Replace 5 occurrences across 2 files with "replacement"?', {
    title: 'Replace All',
    confirmMessage: 'Replace',
  })
})

test('replaceAllAndPrompt - validates input parameters', async () => {
  await expect(ReplaceAllAndPrompt.replaceAllAndPrompt(123 as any, [], 'replacement', 5, 2)).rejects.toThrow()
})
