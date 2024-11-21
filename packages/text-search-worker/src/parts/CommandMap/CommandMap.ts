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
import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as HandleReplaceInput from '../HandleReplaceInput/HandleReplaceInput.ts'
import * as ListFocusFirst from '../ListFocusFirst/ListFocusFirst.ts'
import * as ListFocusIndex from '../ListFocusIndex/ListFocusIndex.ts'
import * as ListFocusLast from '../ListFocusLast/ListFocusLast.ts'
import * as ListFocusNext from '../ListFocusNext/ListFocusNext.ts'
import * as ListFocusNextPage from '../ListFocusNextPage/ListFocusNextPage.ts'
import * as ListFocusPrevious from '../ListFocusPrevious/ListFocusPrevious.ts'
import * as ListFocusPreviouPage from '../ListFocusPreviousPage/ListFocusPreviousPage.ts'
import * as ListHandleClickAt from '../ListHandleClickAt/ListHandleClickAt.ts'
import * as ListHandleScrollBarCaptureLost from '../ListHandleScrollBarCaptureLost/ListHandleScrollBarCaptureLost.ts'
import * as ListHandleScrollBarClick from '../ListHandleScrollBarClick/ListHandleScrollBarClick.ts'
import * as ListHandleScrollBarMove from '../ListHandleScrollBarMove/ListHandleScrollBarMove.ts'
import * as ListHandleWheel from '../ListHandleWheel/ListHandleWheel.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Refresh from '../Refresh/Refresh.ts'
import * as Render from '../Render/Render.ts'
import * as ReplaceAll from '../ReplaceAll/ReplaceAll.ts'
import * as ReplaceAllAndPrompt from '../ReplaceAllAndPrompt/ReplaceAllAndPrompt.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as SearchFocus from '../SearchFocus/SearchFocus.ts'
import * as Submit from '../Submit/Submit.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'
import * as ToggleDetailsExpanded from '../ToggleDetailsExpanded/ToggleDetailsExpanded.ts'
import * as ToggleMatchCase from '../ToggleMatchCase/ToggleMatchCase.ts'
import * as ToggleMatchWholeWord from '../ToggleMatchWholeWord/ToggleMatchWholeWord.ts'
import * as TogglePreserveCase from '../TogglePreserveCase/TogglePreserveCase.ts'
import * as ToggleReplace from '../ToggleReplace/ToggleReplace.ts'
import * as ToggleUseRegularExpression from '../ToggleUseRegularExpression/ToggleUseRegularExpression.ts'
import * as ViewletSearchHandleContextMenu from '../ViewletSearchHandleContextMenu/ViewletSearchHandleContextMenu.ts'
import * as WrapCommand from '../WrapCommand/WrapCommand.ts'

export const commandMap = {
  'TextSearch.clearSearchResults': WrapCommand.wrapCommand(ClearSearchResults.clearSearchResults),
  'TextSearch.copy': WrapCommand.wrapCommand(Copy.copy),
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
  'TextSearch.handleInput': WrapCommand.wrapCommand(HandleInput.handleInput),
  'TextSearch.handleReplaceInput': WrapCommand.wrapCommand(HandleReplaceInput.handleReplaceInput),
  'TextSearch.handleScrollBarCaptureLost': WrapCommand.wrapCommand(ListHandleScrollBarCaptureLost.handleScrollBarCaptureLost),
  'TextSearch.handleScrollBarClick': WrapCommand.wrapCommand(ListHandleScrollBarClick.handleScrollBarClick),
  'TextSearch.handleScrollBarMove': WrapCommand.wrapCommand(ListHandleScrollBarMove.handleScrollBarMove),
  'TextSearch.handleWheel': WrapCommand.wrapCommand(ListHandleWheel.handleWheel),
  'TextSearch.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'TextSearch.refresh': WrapCommand.wrapCommand(Refresh.refresh),
  'TextSearch.replaceAll': WrapCommand.wrapCommand(ReplaceAll.replaceAll),
  'TextSearch.replaceAllAndPrompt': WrapCommand.wrapCommand(ReplaceAllAndPrompt.replaceAllAndPrompt),
  'TextSearch.submit': WrapCommand.wrapCommand(Submit.submit),
  'TextSearch.toggleMatchCase': WrapCommand.wrapCommand(ToggleMatchCase.toggleMatchCase),
  'TextSearch.toggleMatchWholeWord': WrapCommand.wrapCommand(ToggleMatchWholeWord.toggleMatchWholeWord),
  'TextSearch.togglePreserveCase': WrapCommand.wrapCommand(TogglePreserveCase.togglePreserveCase),
  'TextSearch.toggleReplace': WrapCommand.wrapCommand(ToggleReplace.toggleReplace),
  'TextSearch.toggleUseRegularExpression': WrapCommand.wrapCommand(ToggleUseRegularExpression.toggleUseRegularExpression),
  'TextSearch.toggleSearchDetails': WrapCommand.wrapCommand(ToggleDetailsExpanded.toggleDetailsExpanded),

  // not wrapped
  'TextSearch.create': Create.create,
  'TextSearch.render': Render.doRender,
  'TextSearch.saveState': SaveState.saveState,

  // TODO needed?
  'TextSearch.textSearch': TextSearch.textSearch,
}
