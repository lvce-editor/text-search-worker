import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
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
      type: VirtualDomElements.Div,
      className: getClassName(indented),
      role: AriaRoles.Status,
      tabIndex: 0,
      childCount: 1,
    },
    text(message),
  ]
}
