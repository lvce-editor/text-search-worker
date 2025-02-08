import type { SearchState } from '../SearchState/SearchState.ts'
import * as DiffModules from '../DiffModules/DiffModules.ts'

export const diff = (oldState: SearchState, newState: SearchState): readonly number[] => {
  const diffResult: number[] = []
  for (const module of DiffModules.modules) {
    if (!module.isEqual(oldState, newState)) {
      diffResult.push(module.diffType)
    }
  }
  return diffResult
}
