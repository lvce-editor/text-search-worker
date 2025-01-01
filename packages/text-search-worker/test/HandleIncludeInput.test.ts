import { expect, test } from '@jest/globals'
import type { SearchHeader } from '../src/parts/SearchHeader/SearchHeader.ts'
import * as Create from '../src/parts/Create/Create.ts'
import * as HandleIncludeInput from '../src/parts/HandleIncludeInput/HandleIncludeInput.ts'
import * as InputSource from '../src/parts/InputSource/InputSource.ts'

test.skip('handleIncludeInput', () => {
  const initialState: SearchHeader = {
    ...Create.create(0, 0, 0, 0, 0, '', ''),
    includeValue: '',
  }
  const newState = HandleIncludeInput.handleIncludeInput(initialState, '*.ts')
  expect(newState.includeValue).toBe('*.ts')
  expect(newState.focusSource).toBe(InputSource.User)
})
