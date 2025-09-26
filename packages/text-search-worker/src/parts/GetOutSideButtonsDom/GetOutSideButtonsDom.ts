import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { OutSideButtonsDom } from '../OutSideButtonsDom/OutSideButtonsDom.ts'
import * as GetSearchFieldButtonVirtualDom from '../GetSearchFieldButtonVirtualDom/GetSearchFieldButtonVirtualDom.ts'

export const getOutSideButtonsDom = (outsideButtons: readonly InputAction[]): OutSideButtonsDom => {
  if (outsideButtons.length === 0) {
    return {
      preNodes: [],
      postNodes: [],
    }
  }
  return {
    preNodes: [
      {
        type: VirtualDomElements.Div,
        className: ClassNames.SearchFieldContainer,
        role: AriaRoles.None,
        childCount: 1 + outsideButtons.length,
      },
    ],
    postNodes: outsideButtons.flatMap(GetSearchFieldButtonVirtualDom.getSearchFieldButtonVirtualDom),
  }
}
