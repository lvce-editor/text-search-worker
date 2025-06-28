import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as ReplaceAllAndPrompt from '../src/parts/ReplaceAllAndPrompt/ReplaceAllAndPrompt.ts'
import * as RpcId from '../src/parts/RpcId/RpcId.ts'
import * as RpcRegistry from '../src/parts/RpcRegistry/RpcRegistry.ts'

test('replaceAllAndPrompt - user cancels prompt', async () => {
  const mockInvoke = jest.fn((...args: readonly unknown[]) => {
    const method = args[0] as string
    if (method === 'ConfirmPrompt.prompt') {
      return Promise.resolve(false)
    }
    throw new Error(`unexpected method ${method}`)
  })
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const result = await ReplaceAllAndPrompt.replaceAllAndPrompt('/test/workspace', [{ type: 'file', text: 'test.txt' }], 'replacement', 5, 2)

  expect(result).toBe(false)
  expect(mockInvoke).toHaveBeenCalledWith('ConfirmPrompt.prompt', "Replace 5 occurrences across 2 files with 'replacement'", {
    title: 'Replace All',
    confirmMessage: 'Replace',
  })
})

test('replaceAllAndPrompt - user confirms prompt', async () => {
  const mockInvoke = jest.fn((...args: readonly unknown[]) => {
    const method = args[0] as string
    if (method === 'ConfirmPrompt.prompt') {
      return Promise.resolve(true)
    }
    throw new Error(`unexpected method ${method}`)
  })
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  const result = await ReplaceAllAndPrompt.replaceAllAndPrompt('/test/workspace', [{ type: 'file', text: 'test.txt' }], 'replacement', 5, 2)

  expect(result).toBe(true)
  expect(mockInvoke).toHaveBeenCalledWith('ConfirmPrompt.prompt', "Replace 5 occurrences across 2 files with 'replacement'", {
    title: 'Replace All',
    confirmMessage: 'Replace',
  })
})

test('replaceAllAndPrompt - validates input parameters', async () => {
  const mockInvoke = jest.fn((...args: readonly unknown[]) => {
    throw new Error(`unexpected method ${args[0]}`)
  })
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RpcRegistry.set(RpcId.RendererWorker, mockRpc)

  await expect(ReplaceAllAndPrompt.replaceAllAndPrompt(123 as any, [], 'replacement', 5, 2)).rejects.toThrow()
})
