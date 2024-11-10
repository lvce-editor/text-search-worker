import type { SearchState } from '../SearchState/SearchState.ts'

export const handleIconThemeChange = (state: SearchState): SearchState => {
  const { items } = state
  const newItems = [...items]
  return {
    ...state,
    items: newItems,
  }
}
