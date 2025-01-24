import type { InputAction } from '../InputAction/InputAction.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSearchFieldButtonClassName from '../GetSearchFieldButtonClassName/GetSearchFieldButtonClassName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSearchFieldButtonVirtualDom = (button: InputAction): readonly VirtualDomNode[] => {
  const { icon, checked, title, name, disabled } = button
  return [
    {
      type: VirtualDomElements.Button,
      className: GetSearchFieldButtonClassName.getSearchFieldButtonClassName(checked, disabled),
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
