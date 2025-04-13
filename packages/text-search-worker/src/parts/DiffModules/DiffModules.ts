import * as DiffExcludeValue from '../DiffExcludeValue/DiffExcludeValue.ts'
import * as DiffFocus from '../DiffFocus/DiffFocus.ts'
import * as DiffIncludeValue from '../DiffIncludeValue/DiffIncludeValue.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffReplaceValue from '../DiffReplaceValue/DiffReplaceValue.ts'
import * as DiffValue from '../DiffValue/DiffValue.ts'

export const modules = [
  DiffItems.isEqual,
  DiffFocus.isEqual,
  DiffIncludeValue.isEqual,
  DiffExcludeValue.isEqual,
  DiffReplaceValue.isEqual,
  DiffValue.isEqual,
]

export const numbers = [
  DiffItems.diffType,
  DiffFocus.diffType,
  DiffIncludeValue.diffType,
  DiffExcludeValue.diffType,
  DiffReplaceValue.diffType,
  DiffValue.diffType,
]
