import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as GetChevronVirtualDom from '../GetChevronVirtualDom/GetChevronVirtualDom.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const deleted = {
  type: VirtualDomElements.Del,
  className: ClassNames.HighlightDeleted,
  childCount: 1,
}

const inserted = {
  type: VirtualDomElements.Ins,
  className: ClassNames.HighlightInserted,
  childCount: 1,
}

const highlighted = {
  type: VirtualDomElements.Span,
  className: ClassNames.Highlight,
  childCount: 1,
}

const getLabelVirtualDom = (displayText: string, matchLength: number, matchStart: number, replacement: string) => {
  const dom = []
  const label = {
    type: VirtualDomElements.Div,
    className: ClassNames.Label + ' Grow',
    childCount: 1,
  }
  dom.push(label)
  if (matchLength) {
    const before = displayText.slice(0, matchStart)
    const highlight = displayText.slice(matchStart, matchStart + matchLength)
    const after = displayText.slice(matchStart + matchLength)
    if (replacement) {
      dom.push(text(before), deleted, text(highlight), inserted, text(replacement), text(after))
      label.childCount = 4
    } else {
      label.childCount = 3
      dom.push(text(before), highlighted, text(highlight), text(after))
    }
  } else {
    dom.push(text(displayText))
  }
  return dom
}

const renderRow = (rowInfo: any) => {
  // @ts-ignore
  const { top, type, matchStart, matchLength, text: displayText, title, icon, setSize, posInSet, depth, replacement, matchCount, focused } = rowInfo
  const treeItem: any = {
    type: VirtualDomElements.Div,
    role: AriaRoles.TreeItem,
    className: ClassNames.TreeItem,
    title,
    ariaSetSize: setSize,
    ariaLevel: depth,
    ariaPosInSet: posInSet,
    ariaLabel: title,
    ariaDescription: '',
    childCount: 1,
    paddingLeft: `${Number(depth) + 1}rem`, // TODO use classname and dynamic css
    paddingRight: TreeItemPadding.PaddingRight,
  }
  if (focused) {
    treeItem.className += ' ' + ClassNames.TreeItemActive
  }
  switch (type) {
    case TextSearchResultType.File:
      treeItem.ariaExpanded = 'true'
      break
    default:
      break
  }
  const dom = []

  dom.push(treeItem)
  if (type === TextSearchResultType.File) {
    treeItem.childCount += 2
    dom.push(GetChevronVirtualDom.getChevronDownVirtualDom(), GetFileIconVirtualDom.getFileIconVirtualDom(icon))
  }
  dom.push(...getLabelVirtualDom(displayText, matchLength, matchStart, replacement))
  if (matchCount) {
    treeItem.childCount++
    dom.push(...GetBadgeVirtualDom.getBadgeVirtualDom(ClassNames.SourceControlBadge, matchCount))
  }
  treeItem.childCount++
  dom.push(
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchRemove,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.CloseMaskIcon,
      childCount: 0,
    },
  )
  return dom
}

export const getSearchResultsVirtualDom = (visibleItems: any) => {
  return visibleItems.flatMap(renderRow)
}
