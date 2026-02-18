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
      ariaLabel: SearchStrings.toggleSearchDetails(),
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.ToggleDetails, ClassNames.IconButton),
      name: InputName.ToggleSearchDetails,
      onClick: DomEventListenerFunctions.HandleButtonClick,
      role: AriaRoles.Button,
      tabIndex: 0,
      title: SearchStrings.toggleSearchDetails(),
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconEllipsis),
      type: VirtualDomElements.Div,
    },
  ]
}
