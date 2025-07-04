import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as DomId from '../DomId/DomId.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

export const getScrollBarVirtualDom = (scrollBarHeight: number, scrollBarY: number, scrollBarValue: number): readonly VirtualDomNode[] => {
  if (scrollBarHeight === 0) {
    return []
  }
  return [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.ScrollBar, ClassNames.ScrollBarVertical),
      childCount: 1,
      onPointerDown: DomEventListenerFunctions.HandleScrollBarPointerDown,
      role: AriaRoles.ScrollBar,
      ariaControls: DomId.TreeItems,
      ariaValueNow: scrollBarValue,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ScrollBarThumb,
      height: scrollBarHeight,
      translate: `0 ${scrollBarY}px`,
      childCount: 0,
    },
  ]
}
