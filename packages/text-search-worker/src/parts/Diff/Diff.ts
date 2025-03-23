import type { SearchState } from '../SearchState/SearchState.ts'
import * as DiffModules from '../DiffModules/DiffModules.ts'

export const diff = (oldState: SearchState, newState: SearchState): readonly number[] => {
  const diffResult: number[] = []
  for (let i = 0; i < DiffModules.modules.length; i++) {
    const fn = DiffModules.modules[i]
    if (!fn(oldState, newState)) {
      diffResult.push(DiffModules.numbers[i])
    }
  }
  return diffResult
}
