import * as FocusMatchCase from '../FocusMatchCase/FocusMatchCase.ts'
import * as FocusReplaceValue from '../FocusReplaceValue/FocusReplaceValue.ts'
import * as FocusSearchValue from '../FocusSearchValue/FocusSearchValue.ts'
import * as FocusSearchValueNext from '../FocusSearchValueNext/FocusSearchValueNext.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'

export const commandMap = {
  'TextSearch.textSearch': TextSearch.textSearch,
  'SearchView.focusReplaceValue': FocusReplaceValue.focusReplaceValue,
  'SearchView.focusMatchCase': FocusMatchCase.focusMatchCase,
  'SearchView.focusSearchValue': FocusSearchValue.focusSearchValue,
  'SearchView.focusSearchValueNext': FocusSearchValueNext.focusSearchValueNext,
}
