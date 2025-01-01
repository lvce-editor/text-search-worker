import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetInputActionsInput from '../GetInputActionsInput/GetInputActionsInput.ts'
import * as GetInputActionsReplace from '../GetInputActionsReplace/GetInputActionsReplace.ts'
import * as GetSearchFieldVirtualDom from '../GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'
import * as GetSearchToggleVirtualDom from '../GetSearchToggleVirtualDom/GetSearchToggleVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getSearchHeaderTopVirtualDom = (flags: number, searchInputErrorMessage = ''): readonly VirtualDomNode[] => {
  const inputActions = GetInputActionsInput.getInputActionsInput(flags)
  const replaceActions = GetInputActionsReplace.getInputActionsReplace(flags)
  const dom: VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderTop,
      role: AriaRoles.None,
      childCount: 2,
    },
    ...GetSearchToggleVirtualDom.getSearchToggleVirtualDom(flags),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderTopRight,
      role: AriaRoles.None,
      childCount: flags & SearchFlags.ReplaceExpanded ? 2 : 1,
    },
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(
      InputName.SearchValue,
      'Search',
      DomEventListenerFunctions.HandleInput,
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
        'Replace',
        DomEventListenerFunctions.HandleReplaceInput,
        replaceActions.inside,
        replaceActions.outside,
      ),
    )
  }
  return dom
}
