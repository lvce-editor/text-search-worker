import { ViewletCommand } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import { createViewModel } from '../CreateViewModel/CreateViewModel.ts'
import { getCss } from '../GetCss/GetCss.ts'
import { getUniqueIndents } from '../GetUniqueIndents/GetUniqueIndents.ts'

export const renderCss = (oldState: SearchState, newState: SearchState): readonly any[] => {
  const { uid } = newState
  const viewModel = createViewModel(newState)
  const indents = viewModel.displayResults.map((item) => item.indent)
  const uniqueIndents = getUniqueIndents(indents)

  const css = getCss(0, uniqueIndents)
  return [ViewletCommand.SetCss, uid, css]
}
