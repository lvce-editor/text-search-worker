import type { InputAction } from '../InputAction/InputAction.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

const getClassName = (checked: boolean, disabled: boolean | undefined): string => {
  return MergeClassNames.mergeClassNames(
    ClassNames.SearchFieldButton,
    checked ? ClassNames.SearchFieldButtonChecked : '',
    disabled ? ClassNames.SearchFieldButtonDisabled : '',
  )
}

export const getSearchFieldButtonVirtualDom = (button: InputAction): readonly VirtualDomNode[] => {
  const { icon, checked, title, name, disabled } = button
  return [
    {
      type: VirtualDomElements.Button,
      className: getClassName(checked, disabled),
      name,
      title,
      role: AriaRoles.CheckBox,
      ariaChecked: checked,
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
