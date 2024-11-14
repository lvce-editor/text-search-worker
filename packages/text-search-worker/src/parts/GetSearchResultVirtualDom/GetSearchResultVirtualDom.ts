import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as GetChevronVirtualDom from '../GetChevronVirtualDom/GetChevronVirtualDom.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as GetLabelVirtualDom from '../GetLabelVirtualDom/GetLabelVirtualDom.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchResultVirtualDom = (rowInfo: any): readonly VirtualDomNode[] => {
  const { type, matchStart, matchLength, text: displayText, title, icon, setSize, posInSet, depth, replacement, matchCount, focused } = rowInfo
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
  const dom: VirtualDomNode[] = []

  dom.push(treeItem)
  if (type === TextSearchResultType.File) {
    treeItem.childCount += 2
    dom.push(GetChevronVirtualDom.getChevronDownVirtualDom(), GetFileIconVirtualDom.getFileIconVirtualDom(icon))
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
