import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetSearchHeaderTopVirtualDom from '../GetSearchHeaderTopVirtualDom/GetSearchHeaderTopVirtualDom.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getSearchHeaderVirtualDom = (flags: number, message: string): readonly VirtualDomNode[] => {
  const dom: VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeader,
      role: AriaRoles.None,
      childCount: SearchFlags.hasDetailsExpanded(flags) ? 3 : 2,
      onClick: DomEventListenerFunctions.HandleHeaderClick,
      onFocusIn: DomEventListenerFunctions.HandleHeaderFocusIn,
    },
    ...GetSearchHeaderTopVirtualDom.getSearchHeaderTopVirtualDom(flags),
  ]

  if (SearchFlags.hasDetailsExpanded(flags)) {
    // @ts-ignore
    dom[0].childCount++
    dom.push(
      {
        type: VirtualDomElements.Div,
        className: ClassNames.SearchHeaderDetails,
        childCount: 4,
      },
      text('files to include'),
      {
        type: VirtualDomElements.Input,
        childCount: 0,
      },
      text('files to exclude'),
      {
        type: VirtualDomElements.Input,
        childCount: 0,
      },
    )
  }

  dom.push(
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ViewletSearchMessage,
      role: AriaRoles.Status,
      tabIndex: 0,
      childCount: 1,
    },
    text(message),
  )

  return dom
}
