import * as GetSearchDisplayResults from '../GetSearchDisplayResults/GetSearchDisplayResults.ts'
import * as GetSearchVirtualDom from '../GetSearchVirtualDom/GetSearchVirtualDom.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

const renderItems = {
  isEqual(oldState: SearchState, newState: SearchState): boolean {
    return (
      oldState.items === newState.items &&
      oldState.minLineY === newState.minLineY &&
      oldState.maxLineY === newState.maxLineY &&
      oldState.replacement === newState.replacement &&
      oldState.flags === newState.flags &&
      oldState.message === newState.message &&
      oldState.loaded === newState.loaded &&
      oldState.collapsedPaths === newState.collapsedPaths &&
      oldState.listFocusedIndex === newState.listFocusedIndex &&
      oldState.listFocused === newState.listFocused &&
      oldState.icons === newState.icons
    )
  },
  apply(oldState: SearchState, newState: SearchState): any {
    const displayResults = GetSearchDisplayResults.getDisplayResults(
      newState.items,
      newState.itemHeight,
      newState.fileCount,
      newState.value,
      newState.minLineY,
      newState.maxLineY,
      newState.replacement,
      newState.collapsedPaths,
      newState.icons,
      newState.focusedIndex,
    )
    const focusOutline = newState.listFocused && newState.listFocusedIndex === -1
    const dom = GetSearchVirtualDom.getSearchVirtualDom(displayResults, newState.flags, newState.message, focusOutline)
    return ['Viewlet.setDom2', newState.uid, dom]
  },
}

const getSelector = (focusKey: number): string => {
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
  isEqual(oldState: SearchState, newState: SearchState): boolean {
    return oldState.focus === newState.focus || newState.focusSource === InputSource.User
  },
  apply(newState: SearchState): any {
    const selector = getSelector(newState.focus)
    return ['Viewlet.send', newState.uid, 'setFocus', selector, newState.focusSource]
  },
}

const renderValue = {
  isEqual(oldState: SearchState, newState: SearchState): boolean {
    return oldState.value === newState.value || newState.inputSource === InputSource.User
  },
  apply(oldState: SearchState, newState: SearchState): any {
    return ['Viewlet.send', newState.uid, 'setValue', newState.value, '[name="search-value"]']
  },
}

const renderReplacement = {
  isEqual(oldState: SearchState, newState: SearchState): boolean {
    return oldState.replacement === newState.replacement || newState.inputSource === InputSource.User
  },
  apply(oldState: SearchState, newState: SearchState): any {
    return ['Viewlet.send', newState.uid, 'setValue', newState.replacement, '[name="search-replace-value"]']
  },
}

const render = [renderItems, renderFocus, renderValue, renderReplacement]

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
