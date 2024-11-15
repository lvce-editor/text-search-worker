import { expect, test, jest } from '@jest/globals'
import * as IpcChildType from '../src/parts/IpcChildType/IpcChildType.ts'

const mockModule = {
  listen: jest.fn(),
  wrap: jest.fn(),
}

jest.unstable_mockModule('../src/parts/IpcChildModule/IpcChildModule.ts', () => ({
  getModule: jest.fn().mockReturnValue(mockModule),
}))

test('listen - creates ipc with auto type', async () => {
  const { listen } = await import('../src/parts/IpcChild/IpcChild.ts')

  // @ts-ignore
  mockModule.listen.mockResolvedValue({ id: 'test-ipc' })

  await listen({ method: IpcChildType.Auto() })
})

test('listen - throws error when create fails', async () => {
  const { listen } = await import('../src/parts/IpcChild/IpcChild.ts')

  // @ts-ignore
  mockModule.listen.mockRejectedValue(new Error('Failed to create IPC'))

  expect(() => listen({ method: IpcChildType.Auto() })).rejects.toThrow('Failed to create IPC')
})

test('listen - passes correct options to create', async () => {
  const { listen } = await import('../src/parts/IpcChild/IpcChild.ts')

  await listen({ method: IpcChildType.Auto() })

  expect(mockModule.listen).toHaveBeenCalledWith({ method: IpcChildType.Auto() })
})
