import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetOutSideButtonsDom from '../GetOutSideButtonsDom/GetOutSideButtonsDom.ts'
import * as GetSearchFieldButtonVirtualDom from '../GetSearchFieldButtonVirtualDom/GetSearchFieldButtonVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getSearchFieldVirtualDom = (
  name: string,
  placeholder: string,
  onInput: string | number,
  insideButtons: readonly InputAction[],
  outsideButtons: readonly InputAction[],
  hasError = false,
): readonly VirtualDomNode[] => {
  const { preNodes, postNodes } = GetOutSideButtonsDom.getOutSideButtonsDom(outsideButtons)
  const searchFieldClassName = hasError
    ? MergeClassNames.mergeClassNames(ClassNames.SearchField, ClassNames.SearchFieldError)
    : ClassNames.SearchField

  const dom: readonly VirtualDomNode[] = [
    ...preNodes,
    {
      type: VirtualDomElements.Div,
      className: searchFieldClassName,
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
      onFocus: DomEventListenerFunctions.HandleInputFocus,
      onBlur: DomEventListenerFunctions.HandleInputBlur,
      onContextMenu: DomEventListenerFunctions.HandleListContextMenu,
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
