import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

export const getSearchDetailsToggleVirtualDom = (): readonly VirtualDomNode[] => {
  return [
    {
      type: VirtualDomElements.Button,
      className: ClassNames.ToggleDetails,
      role: AriaRoles.Button,
      tabIndex: 0,
      ariaLabel: SearchStrings.toggleSearchDetails(),
      title: SearchStrings.toggleSearchDetails(),
      name: InputName.ToggleSearchDetails,
      onClick: DomEventListenerFunctions.HandleButtonClick,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconEllipsis),
      childCount: 0,
    },
  ]
}
