import { ClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'

const closeIcon: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: ClassNames.CloseMaskIcon,
  childCount: 0,
}

export const getSearchRemoveVirtualDom = (): readonly VirtualDomNode[] => {
  const title = SearchStrings.remove()
  const dom: VirtualDomNode[] = [
    {
      type: VirtualDomElements.Button,
      className: ClassNames.SearchRemove,
      childCount: 1,
      title,
    },
    closeIcon,
  ]
  return dom
}
