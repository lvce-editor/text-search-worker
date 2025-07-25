import { terminate } from '@lvce-editor/viewlet-registry'
import * as ClearSearchResults from '../ClearSearchResults/ClearSearchResults.ts'
import * as CollapseAll from '../CollapseAll/CollapseAll.ts'
import * as CollapseDetails from '../CollapseDetails/CollapseDetails.ts'
import * as Copy from '../Copy/Copy.ts'
import * as Create from '../Create/Create.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as Dismiss from '../Dismiss/Dismiss.ts'
import * as ExpandDetails from '../ExpandDetails/ExpandDetails.ts'
import * as FocusMatchCase from '../FocusMatchCase/FocusMatchCase.ts'
import * as FocusNextInput from '../FocusNextInput/FocusNextInput.ts'
import * as FocusPreviousInput from '../FocusPreviousInput/FocusPreviousInput.ts'
import * as FocusReplaceValue from '../FocusReplaceValue/FocusReplaceValue.ts'
import * as FocusSearchValue from '../FocusSearchValue/FocusSearchValue.ts'
import * as FocusSearchValueNext from '../FocusSearchValueNext/FocusSearchValueNext.ts'
import * as GetCommandIds from '../GetCommandIds/GetCommandIds.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as HandleExcludeInput from '../HandleExcludeInput/HandleExcludeInput.ts'
import * as HandleHeaderClick from '../HandleHeaderClick/HandleHeaderClick.ts'
import * as HandleHeaderContextMenu from '../HandleHeaderContextMenu/HandleHeaderContextMenu.ts'
import * as HandleHeaderFocusIn from '../HandleHeaderFocusIn/HandleHeaderFocusIn.ts'
import * as HandleHeaderFocusOut from '../HandleHeaderFocusOut/HandleHeaderFocusOut.ts'
import * as HandleIconThemeChange from '../HandleIconThemeChange/HandleIconThemeChange.ts'
import * as HandleIncludeInput from '../HandleIncludeInput/HandleIncludeInput.ts'
import * as HandleInput2 from '../HandleInput2/HandleInput2.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as HandleListBlur from '../HandleListBlur/HandleListBlur.ts'
import * as HandleReplaceInput from '../HandleReplaceInput/HandleReplaceInput.ts'
import * as HandleSharedInput from '../HandleSharedInput/HandleSharedInput.ts'
import * as Initialize from '../Initialize/Initialize.ts'
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
import * as NextHistoryResult from '../NextHistoryResult/NextHistoryResult.ts'
import * as PreviousHistoryResult from '../PreviousHistoryResult/PreviousHistoryResult.ts'
import * as Refresh from '../Refresh/Refresh.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderActions from '../RenderActions/RenderActions.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as RenderIncremental from '../RenderIncremental/RenderIncremental.ts'
import * as ReplaceAll from '../ReplaceAll/ReplaceAll.ts'
import * as ReplaceAllAndPrompt from '../ReplaceAllAndPrompt/ReplaceAllAndPrompt.ts'
import * as Rerender from '../Rerender/Rerender.ts'
import * as RestoreState from '../RestoreState/RestoreState.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as SearchFocus from '../SearchFocus/SearchFocus.ts'
import * as WrapCommand from '../SearchViewStates/SearchViewStates.ts'
import * as SelectIndex from '../SelectIndex/SelectIndex.ts'
import * as Submit from '../Submit/Submit.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'
import * as ToggleDetailsExpanded from '../ToggleDetailsExpanded/ToggleDetailsExpanded.ts'
import * as ToggleMatchCase from '../ToggleMatchCase/ToggleMatchCase.ts'
import * as ToggleMatchWholeWord from '../ToggleMatchWholeWord/ToggleMatchWholeWord.ts'
import * as ToggleOpenEditors from '../ToggleOpenEditors/ToggleOpenEditors.ts'
import * as TogglePreserveCase from '../TogglePreserveCase/TogglePreserveCase.ts'
import * as ToggleReplace from '../ToggleReplace/ToggleReplace.ts'
import * as ToggleUseIgnoreFiles from '../ToggleUseIgnoreFiles/ToggleUseIgnoreFiles.ts'
import * as ToggleUseRegularExpression from '../ToggleUseRegularExpression/ToggleUseRegularExpression.ts'
import * as ViewAsTree from '../ViewAsTree/ViewAsTree.ts'
import * as ViewletSearchHandleContextMenu from '../ViewletSearchHandleContextMenu/ViewletSearchHandleContextMenu.ts'

export const commandMap = {
  'TextSearch.clearSearchResults': WrapCommand.wrapCommand(ClearSearchResults.clearSearchResults),
  'TextSearch.collapseAll': WrapCommand.wrapCommand(CollapseAll.collapseAll),
  'TextSearch.collapseDetails': WrapCommand.wrapCommand(CollapseDetails.collapseDetails),
  'TextSearch.copy': WrapCommand.wrapCommand(Copy.copy),
  'TextSearch.diff2': Diff2.diff2,
  'TextSearch.dismissItem': WrapCommand.wrapCommand(Dismiss.dismissItem),
  'TextSearch.expandDetails': WrapCommand.wrapCommand(ExpandDetails.expandDetails),
  'TextSearch.focusFirst': WrapCommand.wrapCommand(ListFocusFirst.focusFirst),
  'TextSearch.focusIndex': WrapCommand.wrapCommand(ListFocusIndex.focusIndex),
  'TextSearch.focusLast': WrapCommand.wrapCommand(ListFocusLast.focusLast),
  'TextSearch.focusMatchCase': WrapCommand.wrapCommand(FocusMatchCase.focusMatchCase),
  'TextSearch.focusMatchCasePrevious': WrapCommand.wrapCommand(SearchFocus.focusMatchCasePrevious),
  'TextSearch.focusMatchWholeWord': WrapCommand.wrapCommand(SearchFocus.focusMatchWholeWord),
  'TextSearch.focusNext': WrapCommand.wrapCommand(ListFocusNext.focusNext),
  'TextSearch.focusNextInput': WrapCommand.wrapCommand(FocusNextInput.focusNextInput),
  'TextSearch.focusNextPage': WrapCommand.wrapCommand(ListFocusNextPage.focusNextPage),
  'TextSearch.focusPreserveCase': WrapCommand.wrapCommand(SearchFocus.focusPreserveCase),
  'TextSearch.focusPreserveCasePrevious': WrapCommand.wrapCommand(SearchFocus.focusPreserveCasePrevious),
  'TextSearch.focusPrevious': WrapCommand.wrapCommand(ListFocusPrevious.focusPrevious),
  'TextSearch.focusPreviousInput': WrapCommand.wrapCommand(FocusPreviousInput.focusPreviousInput),
  'TextSearch.focusPreviousPage': WrapCommand.wrapCommand(ListFocusPreviouPage.focusPreviousPage),
  'TextSearch.focusRegex': WrapCommand.wrapCommand(SearchFocus.focusRegex),
  'TextSearch.focusRegexNext': WrapCommand.wrapCommand(SearchFocus.focusRegexNext),
  'TextSearch.focusReplaceAll': WrapCommand.wrapCommand(SearchFocus.focusReplaceAll),
  'TextSearch.focusReplaceValue': WrapCommand.wrapCommand(FocusReplaceValue.focusReplaceValue),
  'TextSearch.focusReplaceValueNext': WrapCommand.wrapCommand(SearchFocus.focusReplaceValueNext),
  'TextSearch.focusReplaceValuePrevious': WrapCommand.wrapCommand(SearchFocus.focusReplaceValuePrevious),
  'TextSearch.focusSearchValue': WrapCommand.wrapCommand(FocusSearchValue.focusSearchValue),
  'TextSearch.focusSearchValueNext': WrapCommand.wrapCommand(FocusSearchValueNext.focusSearchValueNext),
  'TextSearch.handleClickAt': WrapCommand.wrapCommand(ListHandleClickAt.handleClickAt),
  'TextSearch.handleContextMenu': WrapCommand.wrapCommand(ViewletSearchHandleContextMenu.handleContextMenu),
  'TextSearch.handleExcludeInput': WrapCommand.wrapCommand(HandleExcludeInput.handleExcludeInput),
  'TextSearch.handleFocusIn': WrapCommand.wrapCommand(SearchFocus.handleFocusIn),
  'TextSearch.handleHeaderClick': WrapCommand.wrapCommand(HandleHeaderClick.handleHeaderClick),
  'TextSearch.handleHeaderContextMenu': WrapCommand.wrapCommand(HandleHeaderContextMenu.handleHeaderContextMenu),
  'TextSearch.handleHeaderFocusIn': WrapCommand.wrapCommand(HandleHeaderFocusIn.handleHeaderFocusIn),
  'TextSearch.handleHeaderFocusOut': WrapCommand.wrapCommand(HandleHeaderFocusOut.handleHeaderFocusOut),
  'TextSearch.handleIconThemeChange': WrapCommand.wrapCommand(HandleIconThemeChange.handleIconThemeChange),
  'TextSearch.handleIncludeInput': WrapCommand.wrapCommand(HandleIncludeInput.handleIncludeInput),
  'TextSearch.handleInput': WrapCommand.wrapCommand(HandleInput.handleInput),
  'TextSearch.handleInput2': WrapCommand.wrapCommand(HandleInput2.handleInput2),
  'TextSearch.handleListBlur': WrapCommand.wrapCommand(HandleListBlur.handleListBlur),
  'TextSearch.handleReplaceInput': WrapCommand.wrapCommand(HandleReplaceInput.handleReplaceInput),
  'TextSearch.handleScrollBarCaptureLost': WrapCommand.wrapCommand(ListHandleScrollBarCaptureLost.handleScrollBarCaptureLost),
  'TextSearch.handleScrollBarClick': WrapCommand.wrapCommand(ListHandleScrollBarClick.handleScrollBarClick),
  'TextSearch.handleScrollBarMove': WrapCommand.wrapCommand(ListHandleScrollBarMove.handleScrollBarMove),
  'TextSearch.handleSharedInput': WrapCommand.wrapCommand(HandleSharedInput.handleSharedInput),
  'TextSearch.handleWheel': WrapCommand.wrapCommand(ListHandleWheel.handleWheel),
  'TextSearch.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'TextSearch.nextHistoryResult': WrapCommand.wrapCommand(NextHistoryResult.nextHistoryResult),
  'TextSearch.previousHistoryResult': WrapCommand.wrapCommand(PreviousHistoryResult.previousHistoryResult),
  'TextSearch.refresh': WrapCommand.wrapCommand(Refresh.refresh),
  'TextSearch.replaceAll': WrapCommand.wrapCommand(ReplaceAll.replaceAll),
  'TextSearch.rerender': Rerender.rerender,
  'TextSearch.selectIndex': WrapCommand.wrapCommand(SelectIndex.selectIndex),
  'TextSearch.submit': WrapCommand.wrapCommand(Submit.submit),
  'TextSearch.toggleMatchCase': WrapCommand.wrapCommand(ToggleMatchCase.toggleMatchCase),
  'TextSearch.toggleMatchWholeWord': WrapCommand.wrapCommand(ToggleMatchWholeWord.toggleMatchWholeWord),
  'TextSearch.toggleOpenEditors': WrapCommand.wrapCommand(ToggleOpenEditors.toggleOpenEditors),
  'TextSearch.togglePreserveCase': WrapCommand.wrapCommand(TogglePreserveCase.togglePreserveCase),
  'TextSearch.toggleReplace': WrapCommand.wrapCommand(ToggleReplace.toggleReplace),
  'TextSearch.toggleSearchDetails': WrapCommand.wrapCommand(ToggleDetailsExpanded.toggleDetailsExpanded),
  'TextSearch.toggleUseIgnoreFiles': WrapCommand.wrapCommand(ToggleUseIgnoreFiles.toggleUseIgnoreFiles),
  'TextSearch.toggleUseRegularExpression': WrapCommand.wrapCommand(ToggleUseRegularExpression.toggleUseRegularExpression),
  'TextSearch.viewAsTree': WrapCommand.wrapCommand(ViewAsTree.viewAsTree),

  // not wrapped
  'TextSearch.initialize': Initialize.initialize,
  'TextSearch.create': Create.create,
  'TextSearch.getCommandIds': GetCommandIds.getCommandIds,
  'TextSearch.getKeyBindings': GetKeyBindings.getKeyBindings,
  'TextSearch.render2': Render2.render2,
  'TextSearch.renderEventListeners': RenderEventListeners.renderEventListeners,
  'TextSearch.renderIncremental': RenderIncremental.renderIncremental,
  'TextSearch.restoreState': RestoreState.restoreState,
  'TextSearch.saveState': SaveState.saveState,
  'TextSearch.terminate': terminate,
  'TextSearch.renderActions': RenderActions.renderActions,

  // TODO needed?
  'TextSearch.replaceAllAndPrompt': ReplaceAllAndPrompt.replaceAllAndPrompt,
  'TextSearch.textSearch': TextSearch.textSearch,
}
