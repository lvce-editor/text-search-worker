import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import type { InputAction } from '../InputAction/InputAction.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as GetOutSideButtonsDom from '../GetOutSideButtonsDom/GetOutSideButtonsDom.ts'
import * as GetSearchFieldButtonVirtualDom from '../GetSearchFieldButtonVirtualDom/GetSearchFieldButtonVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSearchFieldVirtualDom = (
  name: string,
  placeholder: string,
  onInput: string,
  insideButtons: readonly InputAction[],
  outsideButtons: readonly InputAction[],
  onFocus = '',
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
