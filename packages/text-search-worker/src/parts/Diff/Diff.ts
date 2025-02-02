import type { SearchState } from '../SearchState/SearchState.ts'
import * as DiffExcludeValue from '../DiffExcludeValue/DiffExcludeValue.ts'
import * as DiffFocus from '../DiffFocus/DiffFocus.ts'
import * as DiffIncludeValue from '../DiffIncludeValue/DiffIncludeValue.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffReplaceValue from '../DiffReplaceValue/DiffReplaceValue.ts'
import * as DiffValue from '../DiffValue/DiffValue.ts'

const modules = [DiffItems, DiffFocus, DiffIncludeValue, DiffExcludeValue, DiffReplaceValue, DiffValue]

export const diff = (oldState: SearchState, newState: SearchState): readonly number[] => {
  const diffResult: number[] = []
  for (const module of modules) {
    if (!module.isEqual(oldState, newState)) {
      diffResult.push(module.diffType)
    }
  }
  return diffResult
}
