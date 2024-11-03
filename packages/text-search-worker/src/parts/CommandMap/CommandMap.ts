import * as FocusMatchCase from '../FocusMatchCase/FocusMatchCase.ts'
import * as FocusReplaceValue from '../FocusReplaceValue/FocusReplaceValue.ts'
import * as FocusSearchValue from '../FocusSearchValue/FocusSearchValue.ts'
import * as FocusSearchValueNext from '../FocusSearchValueNext/FocusSearchValueNext.ts'
import * as GetSearchVirtualDom from '../GetSearchVirtualDom/GetSearchVirtualDom.ts'
import * as SearchFocus from '../SearchFocus/SearchFocus.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'

export const commandMap = {
  'SearchView.focusMatchCase': FocusMatchCase.focusMatchCase,
  'SearchView.focusReplaceValue': FocusReplaceValue.focusReplaceValue,
  'SearchView.focusSearchValue': FocusSearchValue.focusSearchValue,
  'SearchView.focusSearchValueNext': FocusSearchValueNext.focusSearchValueNext,
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
  'TextSearch.getVirtualDom': GetSearchVirtualDom.getSearchVirtualDom,
  'TextSearch.textSearch': TextSearch.textSearch,
}
