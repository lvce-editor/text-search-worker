import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchFieldButtonClassName from '../GetSearchFieldButtonClassName/GetSearchFieldButtonClassName.ts'
import * as InputActionFlag from '../InputActionFlag/InputActionFlag.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

// TODO maybe move logic to viewmodel, which returns ariaChecked 1 | 2 | 3
const getAriaChecked = (flag: number): boolean | undefined => {
  switch (flag) {
    case InputActionFlag.CheckBoxDisabled:
      return false
    case InputActionFlag.CheckBoxEnabled:
      return true
    default:
      return undefined
  }
}

// TODO have have separate renderers for checkbox and button elements
const getRole = (flag: number): string | undefined => {
  switch (flag) {
    case InputActionFlag.CheckBoxDisabled:
    case InputActionFlag.CheckBoxEnabled:
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
  const { flag, icon, name, title } = button
  const ariaChecked = getAriaChecked(flag)
  const role = getRole(flag)
  const disabled = getDisabled(flag)
  return [
    {
      ariaChecked,
      childCount: 1,
      className: GetSearchFieldButtonClassName.getSearchFieldButtonClassName(flag),
      disabled,
      name,
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role,
      tabIndex: 0,
      title,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, icon),
      type: VirtualDomElements.Span,
    },
  ]
}
