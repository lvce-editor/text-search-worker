import { ViewletCommand } from '@lvce-editor/constants'
import type { SearchState } from '../SearchState/SearchState.ts'
import { createViewModel } from '../CreateViewModel/CreateViewModel.ts'
import { getCss } from '../GetCss/GetCss.ts'
import { getUniqueIndents } from '../GetUniqueIndents/GetUniqueIndents.ts'

export const renderCss = (oldState: SearchState, newState: SearchState): readonly any[] => {
  const { focusedIndex, itemHeight, items, minLineY, scrollBarHeight, uid, width } = newState
  const viewModel = createViewModel(newState)
  const indents = viewModel.displayResults.map((item) => item.indent)
  const uniqueIndents = getUniqueIndents(indents)
  const indent = 8
  const padding = 10
  const fileIconWidth = 16
  const defaultPaddingLeft = 0
  const chevronSpace = 22

  const css = getCss(0, uniqueIndents)
  return [ViewletCommand.SetCss, uid, css]
}
