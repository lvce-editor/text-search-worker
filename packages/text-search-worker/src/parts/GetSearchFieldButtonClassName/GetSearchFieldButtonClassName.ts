import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

// TODO checked and disabled, use flag number?
export const getSearchFieldButtonClassName = (checked: boolean, disabled: boolean | undefined): string => {
  return MergeClassNames.mergeClassNames(
    ClassNames.SearchFieldButton,
    checked ? ClassNames.SearchFieldButtonChecked : '',
    disabled ? ClassNames.SearchFieldButtonDisabled : '',
  )
}
