import type { InputAction } from '../InputAction/InputAction.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSearchFieldButtonClassName from '../GetSearchFieldButtonClassName/GetSearchFieldButtonClassName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'

// TODO maybe move logic to viewmodel, which returns ariaChecked 1 | 2 | 3
const getAriaChecked = (flag: number): boolean | undefined => {
  switch (flag) {
    case InputActionFlag.CheckBoxEnabled:
      return true
    case InputActionFlag.CheckBoxDisabled:
      return false
    default:
      return undefined
  }
}

// TODO have have separate renderers for checkbox and button elements
const getRole = (flag: number): string | undefined => {
  switch (flag) {
    case InputActionFlag.CheckBoxEnabled:
    case InputActionFlag.CheckBoxDisabled:
      return AriaRoles.CheckBox
    default:
      return undefined
  }
}

export const getSearchFieldButtonVirtualDom = (button: InputAction): readonly VirtualDomNode[] => {
  const { icon, title, name, flag } = button
  const ariaChecked = getAriaChecked(flag)
  const role = getRole(flag)
  return [
    {
      type: VirtualDomElements.Button,
      className: GetSearchFieldButtonClassName.getSearchFieldButtonClassName(flag),
      name,
      title,
      role,
      ariaChecked,
      tabIndex: 0,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Span,
      className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, icon),
      childCount: 0,
    },
  ]
}
