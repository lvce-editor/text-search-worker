import type { SearchState } from '../SearchState/SearchState.ts'

export const getDefaultExcludes = (state: SearchState): readonly string[] => {
  const { defaultExcludes } = state
  return defaultExcludes
}
