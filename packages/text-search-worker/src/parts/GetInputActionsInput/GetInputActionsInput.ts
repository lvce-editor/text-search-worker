import type { InputAction } from '../InputAction/InputAction.ts'
import type { InputActions } from '../InputActions/InputActions.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getInputActionsInput = (flags: number): InputActions => {
  const inside: readonly InputAction[] = [
    {
      icon: ClassNames.MaskIconCaseSensitive,
      flag: flags & SearchFlags.MatchCase ? InputActionFlag.CheckBoxEnabled : InputActionFlag.CheckBoxDisabled,
      title: SearchStrings.matchCase(),
      name: InputName.MatchCase,
    },
    {
      icon: ClassNames.MaskIconWholeWord,
      flag: flags & SearchFlags.MatchWholeWord ? InputActionFlag.CheckBoxEnabled : InputActionFlag.CheckBoxDisabled,
      title: SearchStrings.matchWholeWord(),
      name: InputName.MatchWholeWord,
    },
    {
      icon: ClassNames.MaskIconRegex,
      flag: flags & SearchFlags.UseRegularExpression ? InputActionFlag.CheckBoxEnabled : InputActionFlag.CheckBoxDisabled,
      title: SearchStrings.useRegularExpression(),
      name: InputName.UseRegularExpression,
    },
  ]
  const outside: readonly InputAction[] = []
  return {
    inside,
    outside,
  }
}
