import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { InputActions } from '../InputActions/InputActions.ts'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getInputActionsReplace = (flags: number, matchCount: number): InputActions => {
  const inside: readonly InputAction[] = [
    {
      icon: ClassNames.MaskIconPreserveCase,
      flag: flags & SearchFlags.PreserveCase ? InputActionFlag.CheckBoxEnabled : InputActionFlag.CheckBoxDisabled,
      title: SearchStrings.preserveCase(),
      name: InputName.PreserveCase,
    },
  ]
  const outside: readonly InputAction[] = [
    {
      icon: ClassNames.MaskIconReplaceAll,
      flag: matchCount === 0 ? InputActionFlag.ButtonDisabled : InputActionFlag.ButtonEnabled,
      title: SearchStrings.replaceAll(),
      name: InputName.ReplaceAll,
    },
  ]
  return {
    inside,
    outside,
  }
}
