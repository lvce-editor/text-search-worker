import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { ViewletCommand } from '@lvce-editor/constants'
import { diffTree } from '@lvce-editor/virtual-dom-worker'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as CreateViewModel from '../CreateViewModel/CreateViewModel.ts'
import * as GetSearchVirtualDom from '../GetSearchVirtualDom/GetSearchVirtualDom.ts'

export const getDom = (state: SearchState): readonly VirtualDomNode[] => {
  const viewModel = CreateViewModel.createViewModel(state)
  const dom = GetSearchVirtualDom.getSearchVirtualDom(
    viewModel.displayResults,
    viewModel.flags,
    viewModel.message,
    viewModel.focusOutline,
    viewModel.searchInputErrorMessage,
    viewModel.scrollBarHeight,
    viewModel.scrollBarY,
    viewModel.scrollBarValue,
    viewModel.deltaY,
    viewModel.itemHeight,
    viewModel.matchCount,
    state.limitHitWarning,
    viewModel.focus,
    state.initial,
  )
  return dom
}

export const renderItems = (oldState: SearchState, newState: SearchState): readonly any[] => {
  const oldDom = getDom(oldState)
  const newDom = getDom(newState)
  const patches = diffTree(oldDom, newDom)
  return [ViewletCommand.SetPatches, newState.uid, patches]
}
