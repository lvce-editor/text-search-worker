import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const deleted: VirtualDomNode = {
  type: VirtualDomElements.Del,
  className: ClassNames.HighlightDeleted,
  childCount: 1,
}

const inserted: VirtualDomNode = {
  type: VirtualDomElements.Ins,
  className: ClassNames.HighlightInserted,
  childCount: 1,
}

const highlighted: VirtualDomNode = {
  type: VirtualDomElements.Span,
  className: ClassNames.Highlight,
  childCount: 1,
}

const label1: VirtualDomNode = {
  type: VirtualDomElements.Div,
  className: MergeClassNames.mergeClassNames(ClassNames.Label, ClassNames.Grow),
  childCount: 1,
}

const label3: VirtualDomNode = {
  ...label1,
  childCount: 3,
}

const label4: VirtualDomNode = {
  ...label1,
  childCount: 4,
}

export const getLabelVirtualDom = (displayText: string, matchLength: number, matchStart: number, replacement: string): readonly VirtualDomNode[] => {
  if (matchLength) {
    const before = displayText.slice(0, matchStart)
    const highlight = displayText.slice(matchStart, matchStart + matchLength)
    const after = displayText.slice(matchStart + matchLength)
    if (replacement) {
      return [label4, text(before), deleted, text(highlight), inserted, text(replacement), text(after)]
    }
    return [label3, text(before), highlighted, text(highlight), text(after)]
  }
  return [label1, text(displayText)]
}
