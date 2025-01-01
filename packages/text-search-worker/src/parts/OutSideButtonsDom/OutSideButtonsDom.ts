import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export interface OutSideButtonsDom {
  readonly preNodes: readonly VirtualDomNode[]
  readonly postNodes: readonly VirtualDomNode[]
}
