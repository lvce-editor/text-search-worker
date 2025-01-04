import type { InputAction } from '../InputAction/InputAction.ts'
import type { InputActions } from '../InputActions/InputActions.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getInputActionsReplace = (flags: number, matchCount: number): InputActions => {
  const inside: readonly InputAction[] = [
    {
      icon: ClassNames.MaskIconPreserveCase,
      checked: Boolean(flags & SearchFlags.PreserveCase),
      title: SearchStrings.preserveCase(),
      name: InputName.PreserveCase,
    },
  ]
  const outside: readonly InputAction[] = [
    {
      icon: ClassNames.MaskIconReplaceAll,
      checked: false,
      title: SearchStrings.replaceAll(),
      name: InputName.ReplaceAll,
      disabled: matchCount === 0,
    },
  ]
  return {
    inside,
    outside,
  }
}
