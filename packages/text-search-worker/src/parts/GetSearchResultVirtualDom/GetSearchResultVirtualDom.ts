import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as GetAriaExpanded from '../GetAriaExpanded/GetAriaExpanded.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as GetIconsVirtualDom from '../GetIconsVirtualDom/GetIconsVirtualDom.ts'
import * as GetLabelVirtualDom from '../GetLabelVirtualDom/GetLabelVirtualDom.ts'
import * as GetPaddingLeft from '../GetPaddingLeft/GetPaddingLeft.ts'
import * as GetSearchRemoveVirtualDom from '../GetSearchRemoveVirtualDom/GetSearchRemoveVirtualDom.ts'
import * as GetSearchResultClassName from '../GetSearchResultClassName/GetSearchResultClassName.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'

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
    ...GetIconsVirtualDom.getIconsVirtualDom(expanded, icon),
    ...GetLabelVirtualDom.getLabelVirtualDom(displayText, matchLength, matchStart, replacement),
    ...GetBadgeVirtualDom.getBadgeVirtualDom(ClassNames.SourceControlBadge, badgeText),
    ...GetSearchRemoveVirtualDom.getSearchRemoveVirtualDom(),
  ]
  return dom
}
