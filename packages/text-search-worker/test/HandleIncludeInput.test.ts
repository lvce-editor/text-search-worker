import { expect, test } from '@jest/globals'
import * as Create from '../src/parts/Create/Create.ts'
import type { SearchHeader } from '../src/parts/SearchHeader/SearchHeader.ts'
import * as HandleIncludeInput from '../src/parts/HandleIncludeInput/HandleIncludeInput.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test('handleIncludeInput', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    includeValue: '',
  }
  const newState = HandleIncludeInput.handleIncludeInput(initialState, '*.ts')
  expect(newState.includeValue).toBe('*.ts')
  expect(newState.focusSource).toBe(InputSource.User)
})
