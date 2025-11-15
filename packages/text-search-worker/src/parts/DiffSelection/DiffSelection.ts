import type { SearchState } from '../SearchState/SearchState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderItems

export const isEqual = (oldState: SearchState, newState: SearchState): boolean => {
  return oldState.selections === newState.selections
}
