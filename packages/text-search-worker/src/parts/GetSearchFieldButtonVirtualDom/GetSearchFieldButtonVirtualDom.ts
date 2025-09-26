import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetSearchFieldButtonClassName from '../GetSearchFieldButtonClassName/GetSearchFieldButtonClassName.ts'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

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

const getDisabled = (flag: number): boolean | undefined => {
  switch (flag) {
    case InputActionFlag.ButtonDisabled:
      return true
    default:
      return undefined
  }
}

export const getSearchFieldButtonVirtualDom = (button: InputAction): readonly VirtualDomNode[] => {
  const { icon, title, name, flag } = button
  const ariaChecked = getAriaChecked(flag)
  const role = getRole(flag)
  const disabled = getDisabled(flag)
  return [
    {
      type: VirtualDomElements.Button,
      className: GetSearchFieldButtonClassName.getSearchFieldButtonClassName(flag),
      name,
      title,
      role,
      ariaChecked,
      disabled,
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
