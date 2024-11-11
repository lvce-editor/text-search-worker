import * as ClearSearchResults from '../ClearSearchResults/ClearSearchResults.ts'
import * as Create from '../Create/Create.ts'
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
import * as ListFocusPrevious from '../ListFocusPrevious/ListFocusPrevious.ts'
import * as ListHandleClickAt from '../ListHandleClickAt/ListHandleClickAt.ts'
import * as ListHandleScrollBarCaptureLost from '../ListHandleScrollBarCaptureLost/ListHandleScrollBarCaptureLost.ts'
import * as ListHandleScrollBarMove from '../ListHandleScrollBarMove/ListHandleScrollBarMove.ts'
import * as ListHandleWheel from '../ListHandleWheel/ListHandleWheel.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Refresh from '../Refresh/Refresh.ts'
import * as Render from '../Render/Render.ts'
import * as SearchFocus from '../SearchFocus/SearchFocus.ts'
import * as Submit from '../Submit/Submit.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'
import * as ViewletSearchHandleContextMenu from '../ViewletSearchHandleContextMenu/ViewletSearchHandleContextMenu.ts'

export const commandMap = {
  'SearchView.focusMatchCase': FocusMatchCase.focusMatchCase,
  'SearchView.focusReplaceValue': FocusReplaceValue.focusReplaceValue,
  'SearchView.focusSearchValue': FocusSearchValue.focusSearchValue,
  'SearchView.focusSearchValueNext': FocusSearchValueNext.focusSearchValueNext,
  'TextSearch.clearSearchResults': ClearSearchResults.clearSearchResults,
  'TextSearch.create': Create.create,
  'TextSearch.doRender': Render.doRender,
  'TextSearch.focusFirst': ListFocusFirst.focusFirst,
  'TextSearch.focusIndex': ListFocusIndex.focusIndex,
  'TextSearch.focusLast': ListFocusLast.focusLast,
  'TextSearch.focusMatchCase': SearchFocus.focusMatchCase,
  'TextSearch.focusMatchCasePrevious': SearchFocus.focusMatchCasePrevious,
  'TextSearch.focusMatchWholeWord': SearchFocus.focusMatchWholeWord,
  'TextSearch.focusNext': ListFocusNext.focusNext,
  'TextSearch.focusNextPage': ListFocusNextPage.focusNextPage,
  'TextSearch.focusPreserveCase': SearchFocus.focusPreserveCase,
  'TextSearch.focusPrevious': ListFocusPrevious.focusPrevious,
  'TextSearch.focusRegex': SearchFocus.focusRegex,
  'TextSearch.focusRegexNext': SearchFocus.focusRegexNext,
  'TextSearch.focusReplaceAll': SearchFocus.focusReplaceAll,
  'TextSearch.focusReplaceValue': SearchFocus.focusReplaceValue,
  'TextSearch.focusReplaceValueNext': SearchFocus.focusReplaceValueNext,
  'TextSearch.focusSearchValue': SearchFocus.focusSearchValue,
  'TextSearch.focusSearchValueNext': SearchFocus.focusSearchValueNext,
  'TextSearch.getActions': GetSearchActions.getActions,
  'TextSearch.getActionsVirtualDom': GetActionsVirtualDom.getActionsVirtualDom,
  'TextSearch.getSearchDisplayResults': GetSearchDisplayResults.getDisplayResults,
  'TextSearch.getVirtualDom': GetSearchVirtualDom.getSearchVirtualDom,
  'TextSearch.handleClickAt': ListHandleClickAt.handleClickAt,
  'TextSearch.handleContextMenu': ViewletSearchHandleContextMenu.handleContextMenu,
  'TextSearch.handleIconThemeChange': HandleIconThemeChange.handleIconThemeChange,
  'TextSearch.handleScrollBarCaptureLost': ListHandleScrollBarCaptureLost.handleScrollBarCaptureLost,
  'TextSearch.handleScrollBarMove': ListHandleScrollBarMove.handleScrollBarMove,
  'TextSearch.handleWheel': ListHandleWheel.handleWheel,
  'TextSearch.loadContent': LoadContent.loadContent,
  'TextSearch.refresh': Refresh.refresh,
  'TextSearch.submit': Submit.submit,
  'TextSearch.textSearch': TextSearch.textSearch,
}
