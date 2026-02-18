import type { SearchState } from '../SearchState/SearchState.ts'

export const handleWorkspaceChange = (state: SearchState): SearchState => {
  return {
    ...state,
    replacement: '',
    value: '',
  }
}
