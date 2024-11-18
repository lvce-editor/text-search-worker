import * as InputSource from '../InputSource/InputSource.ts'
import type { SearchHeader } from '../SearchHeader/SearchHeader.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const createHeader = (): SearchHeader => {
  const state: SearchHeader = {
    detailsExpanded: false,
    excludeValue: '',
    focus: WhenExpression.Empty,
    focused: false,
    focusSource: InputSource.User,
    includeValue: '',
    matchCase: false,
    matchWholeWord: false,
    preserveCase: false,
    replaceExpanded: false,
    replacement: '',
    useRegularExpression: false,
    value: '',
  }
  return state
}
