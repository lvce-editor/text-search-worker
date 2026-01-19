import * as DiffExcludeValue from '../DiffExcludeValue/DiffExcludeValue.ts'
import * as DiffFocus from '../DiffFocus/DiffFocus.ts'
import * as DiffFocusContext from '../DiffFocusContext/DiffFocusContext.ts'
import * as DiffIncludeValue from '../DiffIncludeValue/DiffIncludeValue.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffReplaceValue from '../DiffReplaceValue/DiffReplaceValue.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as DiffValue from '../DiffValue/DiffValue.ts'

export const modules = [
  DiffItems.isEqual,
  DiffFocus.isEqual,
  DiffIncludeValue.isEqual,
  DiffExcludeValue.isEqual,
  DiffReplaceValue.isEqual,
  DiffValue.isEqual,
  DiffFocusContext.isEqual,
]

export const numbers = [
<<<<<<< Updated upstream
  DiffType.RenderItems,
  DiffType.RenderFocus,
  DiffType.RenderIncludeValue,
  DiffType.RenderExcludeValue,
  DiffType.RenderReplaceValue,
  DiffType.RenderValue,
=======
  DiffType.RenderIncremental,
  DiffFocus.diffType,
  DiffIncludeValue.diffType,
  DiffExcludeValue.diffType,
  DiffReplaceValue.diffType,
  DiffValue.diffType,
>>>>>>> Stashed changes
  DiffType.RenderFocusContext,
]
