import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getChevronDownVirtualDom = (extraClassName = ''): VirtualDomNode => {
  return {
    type: VirtualDomElements.Div,
    className: `${ClassNames.Chevron} MaskIconChevronDown ${extraClassName}`,
    childCount: 0,
  }
}

export const getChevronRightVirtualDom = (extraClassName = ''): VirtualDomNode => {
  return {
    type: VirtualDomElements.Div,
    className: `${ClassNames.Chevron} MaskIconChevronRight ${extraClassName}`,
    childCount: 0,
  }
}
