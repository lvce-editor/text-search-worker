import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getSearchInputErrorVirtualDom = (errorMessage: string): readonly VirtualDomNode[] => {
  if (!errorMessage) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchInputError,
      role: AriaRoles.Alert,
      childCount: 1,
    },
    text(errorMessage),
  ]
}
