import type { InputAction } from '../InputAction/InputAction.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetSearchFieldButtonVirtualDom from '../GetSearchFieldButtonVirtualDom/GetSearchFieldButtonVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

interface OutSideButtonsDom {
  readonly preNodes: readonly VirtualDomNode[]
  readonly postNodes: readonly VirtualDomNode[]
}

const getOutSideButtonsDom = (outsideButtons: readonly InputAction[]): OutSideButtonsDom => {
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

export const getSearchFieldVirtualDom = (
  name: string,
  placeholder: string,
  onInput: string,
  insideButtons: readonly InputAction[],
  outsideButtons: readonly InputAction[],
  onFocus = '',
): readonly VirtualDomNode[] => {
  const { preNodes, postNodes } = getOutSideButtonsDom(outsideButtons)
  const dom: readonly VirtualDomNode[] = [
    ...preNodes,
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchField,
      role: AriaRoles.None,
      childCount: 2,
    },
    {
      type: VirtualDomElements.TextArea,
      className: ClassNames.MultilineInputBox,
      spellcheck: false,
      autocapitalize: 'off',
      autocorrect: 'off',
      placeholder,
      name,
      onInput,
      onFocus,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchFieldButtons,
      childCount: insideButtons.length,
    },
    ...insideButtons.flatMap(GetSearchFieldButtonVirtualDom.getSearchFieldButtonVirtualDom),
    ...postNodes,
  ]
  return dom
}
