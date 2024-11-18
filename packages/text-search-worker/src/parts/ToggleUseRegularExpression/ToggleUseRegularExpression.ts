import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'

export const toggleUseRegularExpression = (state: SearchHeader): SearchHeader => {
  const { useRegularExpression } = state
  return {
    ...state,
    useRegularExpression: !useRegularExpression,
  }
}
