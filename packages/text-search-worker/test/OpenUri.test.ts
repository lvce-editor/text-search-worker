import { beforeEach, expect, jest, test } from '@jest/globals'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/Command/Command.ts', () => {
  return {
    execute: jest.fn(() => {
      throw new Error('not implemented')
    }),
  }
})

const OpenUri = await import('../src/parts/OpenUri/OpenUri.ts')
const Command = await import('../src/parts/Command/Command.ts')

test('openUri - without options', async () => {
  // @ts-ignore
  Command.execute.mockImplementation(() => {})
  await OpenUri.openUri('/test/file.txt')
  expect(Command.execute).toHaveBeenCalledTimes(1)
  expect(Command.execute).toHaveBeenCalledWith('Main.openUri', '/test/file.txt', false, undefined)
})

test('openUri - with preview', async () => {
  // @ts-ignore
  Command.execute.mockImplementation(() => {})
  await OpenUri.openUri('/test/file.txt', true)
  expect(Command.execute).toHaveBeenCalledTimes(1)
  expect(Command.execute).toHaveBeenCalledWith('Main.openUri', '/test/file.txt', true, undefined)
})

test('openUri - with options', async () => {
  // @ts-ignore
  Command.execute.mockImplementation(() => {})
  const options = {
    selections: new Uint32Array([1, 0, 1, 0]),
  }
  await OpenUri.openUri('/test/file.txt', false, options)
  expect(Command.execute).toHaveBeenCalledTimes(1)
  expect(Command.execute).toHaveBeenCalledWith('Main.openUri', '/test/file.txt', false, options)
})

test('openUri - error', async () => {
  // @ts-ignore
  Command.execute.mockImplementation(() => {
    throw new Error('Failed to open file')
  })
  await expect(OpenUri.openUri('/test/file.txt')).rejects.toThrow('Failed to open file')
})
