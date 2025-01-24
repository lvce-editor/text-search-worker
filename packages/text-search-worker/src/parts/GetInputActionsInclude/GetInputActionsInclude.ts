import type { InputAction } from '../InputAction/InputAction.ts'
import type { InputActions } from '../InputActions/InputActions.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'
import * as InputName from '../InputName/InputName.ts'
import { OpenEditors } from '../SearchFlags/SearchFlags.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getInputActionsInclude = (flags: number): InputActions => {
  const inside: readonly InputAction[] = [
    {
      icon: ClassNames.MaskIconBook,
      title: SearchStrings.searchOnlyOpenEditors(),
      command: 'searchOnlyOpenEditors',
      flag: flags & OpenEditors ? InputActionFlag.CheckBoxEnabled : InputActionFlag.CheckBoxDisabled,
      name: InputName.SearchOnlyOpenEditors,
    },
  ]
  const outside: readonly InputAction[] = []
  return {
    inside,
    outside,
  }
}
