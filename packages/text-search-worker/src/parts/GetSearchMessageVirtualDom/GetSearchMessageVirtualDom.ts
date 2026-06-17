import { AriaRoles } from '@lvce-editor/constants'
import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getClassName = (isIndented: boolean): string => {
  if (isIndented) {
    return MergeClassNames.mergeClassNames(ClassNames.ViewletSearchMessage, ClassNames.ViewletSearchMessageIndented)
  }
  return ClassNames.ViewletSearchMessage
}

export const getSearchMessageVirtualDom = (message: string, isIndented: boolean): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: getClassName(isIndented),
      role: AriaRoles.Status,
      type: VirtualDomElements.Div,
    },
    text(message),
  ]
}
