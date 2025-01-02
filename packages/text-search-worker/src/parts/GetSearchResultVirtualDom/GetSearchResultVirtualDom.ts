import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as GetChevronVirtualDom from '../GetChevronVirtualDom/GetChevronVirtualDom.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as GetLabelVirtualDom from '../GetLabelVirtualDom/GetLabelVirtualDom.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

const getPaddingLeft = (depth: number): string => {
  return `${Number(depth) + 1}rem` // TODO use classname and dynamic css
}

const getClassName = (focused: boolean): string => {
  if (focused) {
    return ClassNames.TreeItem + ' ' + ClassNames.TreeItemActive
  }
  return ClassNames.TreeItem
}

// TODO instead of setting string, support enum in virtual dom and send enum to renderer process
// which converts it to a boolean
const getAriaExpanded = (expanded: number): string | undefined => {
  switch (expanded) {
    case ExpandedType.Collapsed:
      return 'false'
    case ExpandedType.Expanded:
      return 'true'
    default:
      return undefined
  }
}

export const getSearchResultVirtualDom = (rowInfo: DisplaySearchResult): readonly VirtualDomNode[] => {
  const { matchStart, matchLength, text: displayText, title, icon, setSize, posInSet, depth, replacement, matchCount, focused, expanded } = rowInfo
  const treeItem: any = {
    type: VirtualDomElements.Div,
    role: AriaRoles.TreeItem,
    className: getClassName(focused),
    title,
    ariaSetSize: setSize,
    ariaLevel: depth,
    ariaPosInSet: posInSet,
    ariaLabel: title,
    ariaDescription: '',
    childCount: 1,
    paddingLeft: getPaddingLeft(depth),
    paddingRight: TreeItemPadding.PaddingRight,
    ariaExpanded: getAriaExpanded(expanded),
  }
  const dom: VirtualDomNode[] = []

  dom.push(treeItem)
  if (expanded === ExpandedType.Expanded) {
    // TODO move childcount computation to getDisplaySearchresults
    // TODO add chevronIcon and fileIcon properties to getDisplaySearchResults
    treeItem.childCount += 2
    dom.push(GetChevronVirtualDom.chevronDownVirtualDom, GetFileIconVirtualDom.getFileIconVirtualDom(icon))
  } else if (expanded === ExpandedType.Collapsed) {
    treeItem.childCount += 2
    dom.push(GetChevronVirtualDom.chevronRightVirtualDom, GetFileIconVirtualDom.getFileIconVirtualDom(icon))
  }
  dom.push(...GetLabelVirtualDom.getLabelVirtualDom(displayText, matchLength, matchStart, replacement))
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
