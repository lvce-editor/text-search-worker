import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExpandedType from '../ExpandedType/ExpandedType.ts'
import * as GetAriaExpanded from '../GetAriaExpanded/GetAriaExpanded.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as GetChevronVirtualDom from '../GetChevronVirtualDom/GetChevronVirtualDom.ts'
import * as GetFileIconVirtualDom from '../GetFileIconVirtualDom/GetFileIconVirtualDom.ts'
import * as GetLabelVirtualDom from '../GetLabelVirtualDom/GetLabelVirtualDom.ts'
import * as GetPaddingLeft from '../GetPaddingLeft/GetPaddingLeft.ts'
import * as GetSearchResultClassName from '../GetSearchResultClassName/GetSearchResultClassName.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

const getIconsVirtualDom = (expanded: number, icon: string): readonly VirtualDomNode[] => {
  switch (expanded) {
    case ExpandedType.Expanded:
      return [GetChevronVirtualDom.chevronDownVirtualDom, GetFileIconVirtualDom.getFileIconVirtualDom(icon)]
    case ExpandedType.Collapsed:
      return [GetChevronVirtualDom.chevronRightVirtualDom, GetFileIconVirtualDom.getFileIconVirtualDom(icon)]
    default:
      return []
  }
}

export const getSearchResultVirtualDom = (rowInfo: DisplaySearchResult): readonly VirtualDomNode[] => {
  const {
    matchStart,
    matchLength,
    text: displayText,
    title,
    icon,
    setSize,
    posInSet,
    depth,
    replacement,
    focused,
    expanded,
    childCount,
    badgeText,
  } = rowInfo
  const dom: VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      role: AriaRoles.TreeItem,
      className: GetSearchResultClassName.getSearchResultClassName(focused),
      title,
      ariaSetSize: setSize,
      ariaLevel: depth,
      ariaPosInSet: posInSet,
      ariaLabel: title,
      ariaDescription: '',
      childCount,
      paddingLeft: GetPaddingLeft.getPaddingLeft(depth),
      paddingRight: TreeItemPadding.PaddingRight,
      ariaExpanded: GetAriaExpanded.getAriaExpanded(expanded),
    },
    ...getIconsVirtualDom(expanded, icon),
    ...GetLabelVirtualDom.getLabelVirtualDom(displayText, matchLength, matchStart, replacement),
    ...GetBadgeVirtualDom.getBadgeVirtualDom(ClassNames.SourceControlBadge, badgeText),
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
  ]
  return dom
}
