import { expect, test } from '@jest/globals'
import * as IpcState from '../src/parts/IpcState/IpcState.ts'

test('initial state', () => {
  expect(IpcState.get()).toBeUndefined()
})

test('set and get', () => {
  const mockIpc = {
    send: (): void => {},
    receive: (): void => {},
  }
  IpcState.set(mockIpc)
  expect(IpcState.get()).toBe(mockIpc)
})

test('set overwrites previous value', () => {
  const mockIpc1 = {
    id: 1,
  }
  const mockIpc2 = {
    id: 2,
  }
  IpcState.set(mockIpc1)
  IpcState.set(mockIpc2)
  expect(IpcState.get()).toBe(mockIpc2)
})

test('set with undefined', () => {
  const mockIpc = {
    send: (): void => {},
  }
  IpcState.set(mockIpc)
  IpcState.set(undefined)
  expect(IpcState.get()).toBeUndefined()
})
