import * as SearchFocus from '../SearchFocus/SearchFocus.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'

export const commandMap = {
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
  'TextSearch.textSearch': TextSearch.textSearch,
}
