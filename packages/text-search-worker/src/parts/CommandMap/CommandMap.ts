import * as ClearSearchResults from '../ClearSearchResults/ClearSearchResults.ts'
import * as Copy from '../Copy/Copy.ts'
import * as Create from '../Create/Create.ts'
import * as Dismiss from '../Dismiss/Dismiss.ts'
import * as FocusMatchCase from '../FocusMatchCase/FocusMatchCase.ts'
import * as FocusReplaceValue from '../FocusReplaceValue/FocusReplaceValue.ts'
import * as FocusSearchValue from '../FocusSearchValue/FocusSearchValue.ts'
import * as FocusSearchValueNext from '../FocusSearchValueNext/FocusSearchValueNext.ts'
import * as GetActionsVirtualDom from '../GetActionsVirtualDom/GetActionsVirtualDom.ts'
import * as GetSearchActions from '../GetSearchActions/GetSearchActions.ts'
import * as GetSearchDisplayResults from '../GetSearchDisplayResults/GetSearchDisplayResults.ts'
import * as GetSearchVirtualDom from '../GetSearchVirtualDom/GetSearchVirtualDom.ts'
import * as HandleIconThemeChange from '../HandleIconThemeChange/HandleIconThemeChange.ts'
import * as ListFocusFirst from '../ListFocusFirst/ListFocusFirst.ts'
import * as ListFocusIndex from '../ListFocusIndex/ListFocusIndex.ts'
import * as ListFocusLast from '../ListFocusLast/ListFocusLast.ts'
import * as ListFocusNext from '../ListFocusNext/ListFocusNext.ts'
import * as ListFocusNextPage from '../ListFocusNextPage/ListFocusNextPage.ts'
import * as ListFocusPreviouPage from '../ListFocusPreviouPage/ListFocusPreviousPage.ts'
import * as ListFocusPrevious from '../ListFocusPrevious/ListFocusPrevious.ts'
import * as ListHandleClickAt from '../ListHandleClickAt/ListHandleClickAt.ts'
import * as ListHandleScrollBarCaptureLost from '../ListHandleScrollBarCaptureLost/ListHandleScrollBarCaptureLost.ts'
import * as ListHandleScrollBarClick from '../ListHandleScrollBarClick/ListHandleScrollBarClick.ts'
import * as ListHandleScrollBarMove from '../ListHandleScrollBarMove/ListHandleScrollBarMove.ts'
import * as ListHandleWheel from '../ListHandleWheel/ListHandleWheel.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Refresh from '../Refresh/Refresh.ts'
import * as Render from '../Render/Render.ts'
import * as SearchFocus from '../SearchFocus/SearchFocus.ts'
import * as Submit from '../Submit/Submit.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'
import * as ViewletSearchHandleContextMenu from '../ViewletSearchHandleContextMenu/ViewletSearchHandleContextMenu.ts'
import * as WrapCommand from '../WrapCommand/WrapCommand.ts'

export const commandMap = {
  'TextSearch.clearSearchResults': WrapCommand.wrapCommand(ClearSearchResults.clearSearchResults),
  'TextSearch.copy': WrapCommand.wrapCommand(Copy.copy),
  'TextSearch.create': WrapCommand.wrapCommand(Create.create),
  'TextSearch.dismissItem': WrapCommand.wrapCommand(Dismiss.dismissItem),
  'TextSearch.focusFirst': WrapCommand.wrapCommand(ListFocusFirst.focusFirst),
  'TextSearch.focusIndex': WrapCommand.wrapCommand(ListFocusIndex.focusIndex),
  'TextSearch.focusLast': WrapCommand.wrapCommand(ListFocusLast.focusLast),
  'TextSearch.focusMatchCase': WrapCommand.wrapCommand(FocusMatchCase.focusMatchCase),
  'TextSearch.focusMatchCasePrevious': WrapCommand.wrapCommand(SearchFocus.focusMatchCasePrevious),
  'TextSearch.focusMatchWholeWord': WrapCommand.wrapCommand(SearchFocus.focusMatchWholeWord),
  'TextSearch.focusNext': WrapCommand.wrapCommand(ListFocusNext.focusNext),
  'TextSearch.focusNextPage': WrapCommand.wrapCommand(ListFocusNextPage.focusNextPage),
  'TextSearch.focusPreserveCase': WrapCommand.wrapCommand(SearchFocus.focusPreserveCase),
  'TextSearch.focusPrevious': WrapCommand.wrapCommand(ListFocusPrevious.focusPrevious),
  'TextSearch.focusPreviousPage': WrapCommand.wrapCommand(ListFocusPreviouPage.focusPreviousPage),
  'TextSearch.focusRegex': WrapCommand.wrapCommand(SearchFocus.focusRegex),
  'TextSearch.focusRegexNext': WrapCommand.wrapCommand(SearchFocus.focusRegexNext),
  'TextSearch.focusReplaceAll': WrapCommand.wrapCommand(SearchFocus.focusReplaceAll),
  'TextSearch.focusReplaceValue': WrapCommand.wrapCommand(FocusReplaceValue.focusReplaceValue),
  'TextSearch.focusReplaceValueNext': WrapCommand.wrapCommand(SearchFocus.focusReplaceValueNext),
  'TextSearch.focusSearchValue': WrapCommand.wrapCommand(FocusSearchValue.focusSearchValue),
  'TextSearch.focusSearchValueNext': WrapCommand.wrapCommand(FocusSearchValueNext.focusSearchValueNext),
  'TextSearch.getActions': WrapCommand.wrapCommand(GetSearchActions.getActions),
  'TextSearch.getActionsVirtualDom': WrapCommand.wrapCommand(GetActionsVirtualDom.getActionsVirtualDom),
  'TextSearch.getSearchDisplayResults': WrapCommand.wrapCommand(GetSearchDisplayResults.getDisplayResults),
  'TextSearch.getVirtualDom': WrapCommand.wrapCommand(GetSearchVirtualDom.getSearchVirtualDom),
  'TextSearch.handleClickAt': WrapCommand.wrapCommand(ListHandleClickAt.handleClickAt),
  'TextSearch.handleContextMenu': WrapCommand.wrapCommand(ViewletSearchHandleContextMenu.handleContextMenu),
  'TextSearch.handleFocusIn': WrapCommand.wrapCommand(SearchFocus.handleFocusIn),
  'TextSearch.handleIconThemeChange': WrapCommand.wrapCommand(HandleIconThemeChange.handleIconThemeChange),
  'TextSearch.handleScrollBarCaptureLost': WrapCommand.wrapCommand(ListHandleScrollBarCaptureLost.handleScrollBarCaptureLost),
  'TextSearch.handleScrollBarClick': WrapCommand.wrapCommand(ListHandleScrollBarClick.handleScrollBarClick),
  'TextSearch.handleScrollBarMove': WrapCommand.wrapCommand(ListHandleScrollBarMove.handleScrollBarMove),
  'TextSearch.handleWheel': WrapCommand.wrapCommand(ListHandleWheel.handleWheel),
  'TextSearch.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'TextSearch.refresh': WrapCommand.wrapCommand(Refresh.refresh),
  'TextSearch.submit': WrapCommand.wrapCommand(Submit.submit),

  // not wrapped
  'TextSearch.render': Render.doRender,

  // TODO needed?
  'TextSearch.textSearch': TextSearch.textSearch,
}
