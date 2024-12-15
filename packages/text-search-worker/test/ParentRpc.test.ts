import { expect, test } from '@jest/globals'
import * as ParentRpc from '../src/parts/ParentRpc/ParentRpc.ts'

test('invoke - successfully invokes command', async () => {
  const mockRpc = {
    invoke: async (command: string, ...args: any[]) => 'test result',
  }
  ParentRpc.setRpc(mockRpc)

  const result = await ParentRpc.invoke('test.command', 'arg1', 'arg2')
  expect(result).toBe('test result')
})

test('invoke - handles error from rpc', async () => {
  const mockRpc = {
    invoke: async () => {
      throw new Error('test error')
    },
  }
  ParentRpc.setRpc(mockRpc)

  await expect(ParentRpc.invoke('test.command')).rejects.toThrow('test error')
})

test('invoke - handles undefined arguments', async () => {
  const mockRpc = {
    invoke: async (command: string, ...args: any[]) => 'success',
  }
  ParentRpc.setRpc(mockRpc)

  const result = await ParentRpc.invoke('test.command')
  expect(result).toBe('success')
})

test('invoke - handles multiple arguments of different types', async () => {
  let capturedArgs: any[] = []
  const mockRpc = {
    invoke: async (command: string, ...args: any[]) => {
      capturedArgs = args
      return 'success'
    },
  }
  ParentRpc.setRpc(mockRpc)

  const args = [1, 'string', true, { key: 'value' }, [1, 2, 3]]
  await ParentRpc.invoke('test.command', ...args)
  expect(capturedArgs).toEqual(args)
})