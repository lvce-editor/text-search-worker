import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import type { DisplaySearchResult } from '../DisplaySearchResult/DisplaySearchResult.ts'
import * as GetAriaExpanded from '../GetAriaExpanded/GetAriaExpanded.ts'
import * as GetBadgeVirtualDom from '../GetBadgeVirtualDom/GetBadgeVirtualDom.ts'
import * as GetChevronVirtualDom from '../GetChevronVirtualDom/GetChevronVirtualDom.ts'
import * as GetIconsVirtualDom from '../GetIconsVirtualDom/GetIconsVirtualDom.ts'
import * as GetLabelVirtualDom from '../GetLabelVirtualDom/GetLabelVirtualDom.ts'
import * as GetPaddingLeft from '../GetPaddingLeft/GetPaddingLeft.ts'
import { getChildCount } from '../GetSearchDisplayResultChildCount/GetSearchDisplayResultChildCount.ts'
import * as GetSearchRemoveVirtualDom from '../GetSearchRemoveVirtualDom/GetSearchRemoveVirtualDom.ts'
import * as GetSearchResultClassName from '../GetSearchResultClassName/GetSearchResultClassName.ts'
import * as TreeItemPadding from '../TreeItemPadding/TreeItemPadding.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchResultVirtualDom = (rowInfo: DisplaySearchResult): readonly VirtualDomNode[] => {
  const { matchStart, matchLength, text: displayText, title, icon, setSize, posInSet, depth, replacement, focused, expanded, badgeText } = rowInfo
  const childCount = getChildCount(icon, expanded, badgeText)
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
    ...GetChevronVirtualDom.getChevronVirtualDom(expanded),
    ...GetIconsVirtualDom.getIconsVirtualDom(icon),
    ...GetLabelVirtualDom.getLabelVirtualDom(displayText, matchLength, matchStart, replacement),
    ...GetBadgeVirtualDom.getBadgeVirtualDom(badgeText),
    ...GetSearchRemoveVirtualDom.getSearchRemoveVirtualDom(),
  ]
  return dom
}
