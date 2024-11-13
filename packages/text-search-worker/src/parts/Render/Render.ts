import * as GetSearchDisplayResults from '../GetSearchDisplayResults/GetSearchDisplayResults.ts'
import * as GetSearchVirtualDom from '../GetSearchVirtualDom/GetSearchVirtualDom.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import type { SearchState } from '../SearchState/SearchState.ts'

const renderItems = {
  isEqual(oldState: SearchState, newState: SearchState) {
    return (
      oldState.items === newState.items &&
      oldState.minLineY === newState.minLineY &&
      oldState.maxLineY === newState.maxLineY &&
      oldState.replacement === newState.replacement &&
      oldState.replaceExpanded === newState.replaceExpanded &&
      oldState.matchCase === newState.matchCase &&
      oldState.matchWholeWord === newState.matchWholeWord &&
      oldState.useRegularExpression === newState.useRegularExpression &&
      oldState.message === newState.message &&
      oldState.detailsExpanded === newState.detailsExpanded &&
      oldState.loaded === newState.loaded &&
      oldState.collapsedPaths === newState.collapsedPaths &&
      oldState.listFocusedIndex === newState.listFocusedIndex &&
      oldState.listFocused === newState.listFocused
    )
  },
  apply(oldState: SearchState, newState: SearchState) {
    const displayResults = GetSearchDisplayResults.getDisplayResults(
      newState.items,
      newState.itemHeight,
      newState.fileCount,
      newState.value,
      newState.minLineY,
      newState.maxLineY,
      newState.replacement,
      newState.collapsedPaths,
      newState.focusedIndex,
    )
    const focusOutline = newState.listFocused && newState.listFocusedIndex === -1
    const dom = GetSearchVirtualDom.getSearchVirtualDom(
      displayResults,
      newState.replaceExpanded,
      newState.matchCase,
      newState.matchWholeWord,
      newState.useRegularExpression,
      newState.message,
      newState.detailsExpanded,
      focusOutline,
    )
    return ['Viewlet.setDom2', dom]
  },
}

const getSelector = (focusKey: number) => {
  switch (focusKey) {
    case WhenExpression.FocusSearchInput:
      return '[name="search-value"]'
    case WhenExpression.FocusSearchReplaceInput:
      return '[name="search-replace-value"]'
    case WhenExpression.FocusSearchMatchCase:
      return '[title="Match Case"]'
    case WhenExpression.FocusSearchPreserveCase:
      return '[title="Preserve Case"]'
    case WhenExpression.FocusSearchRegex:
      return '[title="Use Regular Expression"]'
    default:
      return ''
  }
}

const renderFocus = {
  isEqual(oldState: SearchState, newState: SearchState) {
    return oldState.focus === newState.focus
  },
  apply(newState: SearchState) {
    const selector = getSelector(newState.focus)
    return ['setFocus', selector]
  },
}

const render = [renderItems, renderFocus]

export const doRender = (uid: number): any => {
  const { oldState, newState } = SearchViewStates.get(uid)
  const commands = []
  for (const fn of render) {
    if (!fn.isEqual(oldState, newState)) {
      commands.push(fn.apply(oldState, newState))
    }
  }
  return commands
}
