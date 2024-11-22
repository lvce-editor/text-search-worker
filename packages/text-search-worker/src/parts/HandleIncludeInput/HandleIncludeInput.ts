import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as InputSource from '../InputSource/InputSource.ts'

export const handleIncludeInput = (state: SearchHeader, includeValue: string): SearchHeader => {
  return {
    ...state,
    includeValue,
    focusSource: InputSource.User,
  }
}
