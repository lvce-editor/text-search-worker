import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetInputActionsInput from '../GetInputActionsInput/GetInputActionsInput.ts'
import * as GetInputActionsReplace from '../GetInputActionsReplace/GetInputActionsReplace.ts'
import { getReplacePlaceholder } from '../GetReplacePlaceholder/GetReplacePlaceholder.ts'
import * as GetSearchFieldVirtualDom from '../GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'
import { getSearchPlaceholder } from '../GetSearchPlaceholder/GetSearchPlaceholder.ts'
import * as GetSearchToggleVirtualDom from '../GetSearchToggleVirtualDom/GetSearchToggleVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSearchHeaderTopVirtualDom = (
  flags: number,
  searchInputErrorMessage: string,
  matchCount: number,
  focus: number,
): readonly VirtualDomNode[] => {
  const inputActions = GetInputActionsInput.getInputActionsInput(flags)
  const replaceActions = GetInputActionsReplace.getInputActionsReplace(flags, matchCount)
  const searchPlaceholder = getSearchPlaceholder(focus)
  const replacePlaceholder = getReplacePlaceholder(focus)
  const replaceExpanded = flags & SearchFlags.ReplaceExpanded
  const dom: VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderTop,
      role: AriaRoles.None,
      childCount: 2,
    },
    ...GetSearchToggleVirtualDom.getSearchToggleVirtualDom(replaceExpanded),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderTopRight,
      role: AriaRoles.None,
      childCount: replaceExpanded ? 2 : 1,
    },
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(
      InputName.SearchValue,
      searchPlaceholder,
      DomEventListenerFunctions.HandleInput2,
      inputActions.inside,
      inputActions.outside,
      '',
      Boolean(searchInputErrorMessage),
    ),
  ]

  if (flags & SearchFlags.ReplaceExpanded) {
    dom.push(
      ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(
        InputName.ReplaceValue,
        replacePlaceholder,
        DomEventListenerFunctions.HandleInput2,
        replaceActions.inside,
        replaceActions.outside,
      ),
    )
  }
  return dom
}
