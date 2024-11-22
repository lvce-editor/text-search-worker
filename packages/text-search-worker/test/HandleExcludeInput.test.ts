import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchState } from '../src/parts/SearchState/SearchState.ts'
import * as HandleExcludeInput from '../src/parts/HandleExcludeInput/HandleExcludeInput.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('handleExcludeInput', async () => {
  const initialState: SearchState = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    excludeValue: '',
  }
  const newState = await HandleExcludeInput.handleExcludeInput(initialState, 'node_modules', InputSource.User)
  expect(newState.excludeValue).toBe('node_modules')
  expect(newState.inputSource).toBe(InputSource.User)
})
