import { expect, test, jest } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

const mockHandleUpdate = {
  handleUpdate: jest.fn(),
}

jest.unstable_mockModule('../src/parts/HandleUpdate/HandleUpdate.ts', () => mockHandleUpdate)

test('handleSharedInput - search value input', async () => {
  const { handleSharedInput } = await import('../src/parts/HandleSharedInput/HandleSharedInput.ts')
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const name = 'search-value'
  const value = 'test'
  const inputSource = InputSource.User
  // @ts-expect-error
  mockHandleUpdate.handleUpdate.mockResolvedValue({ ...state, value } as SearchState)

  const result = await handleSharedInput(state, name, value, inputSource)

  expect(result).toEqual({ ...state, value })
  expect(mockHandleUpdate.handleUpdate).toHaveBeenCalledWith(state, { value, inputSource })
})

test('handleSharedInput - replacement value input', async () => {
  const { handleSharedInput } = await import('../src/parts/HandleSharedInput/HandleSharedInput.ts')
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const name = 'replacement-value'
  const value = 'replacement'
  const inputSource = InputSource.User
  // @ts-expect-error
  mockHandleUpdate.handleUpdate.mockResolvedValue({ ...state, replacement: value } as SearchState)

  const result = await handleSharedInput(state, name, value, inputSource)

  expect(result).toEqual({ ...state, replacement: value })
  expect(mockHandleUpdate.handleUpdate).toHaveBeenCalledWith(state, { replacement: value, inputSource })
})

test('handleSharedInput - exclude files input', async () => {
  const { handleSharedInput } = await import('../src/parts/HandleSharedInput/HandleSharedInput.ts')
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const name = 'files-to-exclude-value'
  const value = '*.test.ts'
  const inputSource = InputSource.User

  // @ts-expect-error
  mockHandleUpdate.handleUpdate.mockResolvedValue({ ...state, excludeValue: value } as SearchState)

  const result = await handleSharedInput(state, name, value, inputSource)

  expect(result).toEqual({ ...state, excludeValue: value })
  expect(mockHandleUpdate.handleUpdate).toHaveBeenCalledWith(state, { excludeValue: value, inputSource })
})

test('handleSharedInput - unknown input handler throws error', async () => {
  const { handleSharedInput } = await import('../src/parts/HandleSharedInput/HandleSharedInput.ts')
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const name = 'unknown-handler'
  const value = 'test'

  expect(() => handleSharedInput(state, name, value)).toThrow('unknown input handler: unknown-handler')
})

test('handleSharedInput - uses default input source when not provided', async () => {
  const { handleSharedInput } = await import('../src/parts/HandleSharedInput/HandleSharedInput.ts')
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const name = 'search-value'
  const value = 'test'

  // @ts-expect-error
  mockHandleUpdate.handleUpdate.mockResolvedValue({ ...state, value } as SearchState)

  await handleSharedInput(state, name, value)

  expect(mockHandleUpdate.handleUpdate).toHaveBeenCalledWith(state, { value, inputSource: InputSource.Script })
})
