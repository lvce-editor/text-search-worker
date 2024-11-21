import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchDetailsToggleVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ToggleDetails,
      role: AriaRoles.Button,
      tabIndex: 0,
      ariaLabel: 'Toggle Search Details',
      title: 'Toggle Search Details',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconEllipsis),
      childCount: 0,
    },
  ]
}
