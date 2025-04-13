import * as DiffExcludeValue from '../DiffExcludeValue/DiffExcludeValue.ts'
import * as DiffFocus from '../DiffFocus/DiffFocus.ts'
import * as DiffIncludeValue from '../DiffIncludeValue/DiffIncludeValue.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffReplaceValue from '../DiffReplaceValue/DiffReplaceValue.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as DiffValue from '../DiffValue/DiffValue.ts'

export const modules = [
  DiffItems.isEqual,
  DiffExcludeValue.isEqual,
  DiffFocus.isEqual,
  DiffFocus.isEqual,
  DiffIncludeValue.isEqual,
  DiffReplaceValue.isEqual,
  DiffValue.isEqual,
]

export const numbers = [
  DiffItems.diffType,
  DiffExcludeValue.diffType,
  DiffFocus.diffType,
  DiffType.RenderFocusContext,
  DiffIncludeValue.diffType,
  DiffReplaceValue.diffType,
  DiffValue.diffType,
]
