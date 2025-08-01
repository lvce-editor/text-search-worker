import { ClassNames } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetInputActionsExclude from '../GetInputActionsExclude/GetInputActionsExclude.ts'
import * as GetInputActionsInclude from '../GetInputActionsInclude/GetInputActionsInclude.ts'
import * as GetSearchDetailsToggleVirtualDom from '../GetSearchDetailsToggleVirtualDom/GetSearchDetailsToggleVirtualDom.ts'
import * as GetSearchFieldVirtualDom from '../GetSearchFieldVirtualDom/GetSearchFieldVirtualDom.ts'
import * as GetSearchMessageVirtualDom from '../GetSearchMessageVirtualDom/GetSearchMessageVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getSearchHeaderDetailsExpandedVirtualDom = (flags: number, message: string): readonly VirtualDomNode[] => {
  const includeButtons = GetInputActionsInclude.getInputActionsInclude(flags)
  const excludeButtons = GetInputActionsExclude.getInputActionsExclude(flags)
  const includePlaceholder = SearchStrings.include()
  const excludePlaceholder = SearchStrings.exclude()
  return [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderDetailsExpanded,
      childCount: 5,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.SearchHeaderDetailsExpandedTop,
      childCount: 2,
    },
    ...GetSearchDetailsToggleVirtualDom.getSearchDetailsToggleVirtualDom(),
    {
      type: VirtualDomElements.H4,
      className: ClassNames.SearchHeaderDetailsHeading,
      childCount: 1,
    },
    text(SearchStrings.filesToInclude()),
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(
      InputName.FilesToInclude,
      includePlaceholder,
      DomEventListenerFunctions.HandleInput2,
      includeButtons.inside,
      includeButtons.outside,
    ),
    {
      type: VirtualDomElements.H4,
      className: ClassNames.SearchHeaderDetailsHeading,
      childCount: 1,
    },
    text(SearchStrings.filesToExclude()),
    ...GetSearchFieldVirtualDom.getSearchFieldVirtualDom(
      InputName.FilesToExclude,
      excludePlaceholder,
      DomEventListenerFunctions.HandleInput2,
      excludeButtons.inside,
      excludeButtons.outside,
    ),
    ...GetSearchMessageVirtualDom.getSearchMessageVirtualDom(message, false),
  ]
}
