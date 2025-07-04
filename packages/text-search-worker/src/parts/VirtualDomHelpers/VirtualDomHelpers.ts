import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const text = (data: string): VirtualDomNode => {
  return {
    type: VirtualDomElements.Text,
    text: data,
    childCount: 0,
  }
}
