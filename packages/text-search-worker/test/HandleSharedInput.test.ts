import { expect, test } from '@jest/globals'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test.skip('handleSharedInput - search value input', async () => {
  const { handleSharedInput } = await import('../src/parts/HandleSharedInput/HandleSharedInput.ts')
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const name = 'search-value'
  const value = 'test'
  const inputSource = InputSource.User
  // @ts-expect-error
  mockHandleUpdate.handleUpdate.mockResolvedValue({ ...state, value } as SearchState)

  const result = await handleSharedInput(state, name, value, inputSource)

  expect(result).toEqual({ ...state, value })
})

test.skip('handleSharedInput - replacement value input', async () => {
  const { handleSharedInput } = await import('../src/parts/HandleSharedInput/HandleSharedInput.ts')
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const name = 'replacement-value'
  const value = 'replacement'
  const inputSource = InputSource.User
  // @ts-expect-error
  mockHandleUpdate.handleUpdate.mockResolvedValue({ ...state, replacement: value } as SearchState)

  const result = await handleSharedInput(state, name, value, inputSource)

  expect(result).toEqual({ ...state, replacement: value })
})

test.skip('handleSharedInput - exclude files input', async () => {
  const { handleSharedInput } = await import('../src/parts/HandleSharedInput/HandleSharedInput.ts')
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const name = 'files-to-exclude-value'
  const value = '*.test.ts'
  const inputSource = InputSource.User

  // @ts-expect-error
  mockHandleUpdate.handleUpdate.mockResolvedValue({ ...state, excludeValue: value } as SearchState)

  const result = await handleSharedInput(state, name, value, inputSource)

  expect(result).toEqual({ ...state, excludeValue: value })
})

test.skip('handleSharedInput - unknown input handler throws error', async () => {
  const { handleSharedInput } = await import('../src/parts/HandleSharedInput/HandleSharedInput.ts')
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const name = 'unknown-handler'
  const value = 'test'

  expect(() => handleSharedInput(state, name, value)).toThrow('unknown input handler: unknown-handler')
})

test.skip('handleSharedInput - uses default input source when not provided', async () => {
  const { handleSharedInput } = await import('../src/parts/HandleSharedInput/HandleSharedInput.ts')
  const state: SearchState = Create.create(0, 0, 0, 0, 0, '', '')
  const name = 'search-value'
  const value = 'test'

  // @ts-expect-error
  mockHandleUpdate.handleUpdate.mockResolvedValue({ ...state, value } as SearchState)

  await handleSharedInput(state, name, value)
})
