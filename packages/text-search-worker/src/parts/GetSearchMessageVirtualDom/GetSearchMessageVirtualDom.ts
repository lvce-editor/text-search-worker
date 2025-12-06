import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getClassName = (indented: boolean): string => {
  if (indented) {
    return MergeClassNames.mergeClassNames(ClassNames.ViewletSearchMessage, ClassNames.ViewletSearchMessageIndented)
  }
  return ClassNames.ViewletSearchMessage
}

export const getSearchMessageVirtualDom = (message: string, indented: boolean): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: getClassName(indented),
      role: AriaRoles.Status,
      type: VirtualDomElements.Div,
    },
    text(message),
  ]
}
