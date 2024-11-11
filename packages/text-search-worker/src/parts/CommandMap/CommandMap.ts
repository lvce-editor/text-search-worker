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
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Render from '../Render/Render.ts'
import * as SearchFocus from '../SearchFocus/SearchFocus.ts'
import * as Submit from '../Submit/Submit.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'
import * as ViewletSearchHandleContextMenu from '../ViewletSearchHandleContextMenu/ViewletSearchHandleContextMenu.ts'
import * as Refresh from '../Refresh/Refresh.ts'
import * as ClearSearchResults from '../ClearSearchResults/ClearSearchResults.ts'

export const commandMap = {
  'SearchView.focusMatchCase': FocusMatchCase.focusMatchCase,
  'SearchView.focusReplaceValue': FocusReplaceValue.focusReplaceValue,
  'SearchView.focusSearchValue': FocusSearchValue.focusSearchValue,
  'SearchView.focusSearchValueNext': FocusSearchValueNext.focusSearchValueNext,
  'TextSearch.create': Create.create,
  'TextSearch.doRender': Render.doRender,
  'TextSearch.focusMatchCase': SearchFocus.focusMatchCase,
  'TextSearch.focusMatchCasePrevious': SearchFocus.focusMatchCasePrevious,
  'TextSearch.focusMatchWholeWord': SearchFocus.focusMatchWholeWord,
  'TextSearch.focusPreserveCase': SearchFocus.focusPreserveCase,
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
  'TextSearch.handleContextMenu': ViewletSearchHandleContextMenu.handleContextMenu,
  'TextSearch.handleIconThemeChange': HandleIconThemeChange.handleIconThemeChange,
  'TextSearch.loadContent': LoadContent.loadContent,
  'TextSearch.submit': Submit.submit,
  'TextSearch.textSearch': TextSearch.textSearch,
  'TextSearch.refresh': Refresh.refresh,
  'TextSearch.clearSearchResults': ClearSearchResults.clearSearchResults,
}
