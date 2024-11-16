import { expect, jest, test } from '@jest/globals'
import * as CommandMap from '../src/parts/CommandMap/CommandMap.ts'
import * as IpcChildType from '../src/parts/IpcChildType/IpcChildType.ts'

jest.unstable_mockModule('../src/parts/Command/Command.ts', () => {
  return {
    register: jest.fn(),
  }
})

jest.unstable_mockModule('../src/parts/IpcChild/IpcChild.ts', () => {
  return {
    listen: jest.fn(),
  }
})

jest.unstable_mockModule('../src/parts/HandleIpc/HandleIpc.ts', () => {
  return {
    handleIpc: jest.fn(),
  }
})

jest.unstable_mockModule('../src/parts/ParentRpc/ParentRpc.ts', () => {
  return {
    listen: jest.fn(),
  }
})

const Command = await import('../src/parts/Command/Command.ts')
const IpcChild = await import('../src/parts/IpcChild/IpcChild.ts')
const HandleIpc = await import('../src/parts/HandleIpc/HandleIpc.ts')
const Rpc = await import('../src/parts/ParentRpc/ParentRpc.ts')
const Listen = await import('../src/parts/Listen/Listen.ts')

test.skip('listen registers commands and sets up IPC', async () => {
  const mockIpc: any = {}
  // @ts-ignore
  IpcChild.listen.mockResolvedValue(mockIpc)

  await Listen.listen()

  expect(Command.register).toHaveBeenCalledWith(CommandMap.commandMap)
  expect(IpcChild.listen).toHaveBeenCalledWith({ method: IpcChildType.Auto() })
  expect(HandleIpc.handleIpc).toHaveBeenCalledWith(mockIpc)
  expect(Rpc.listen).toHaveBeenCalledWith(mockIpc)
})
