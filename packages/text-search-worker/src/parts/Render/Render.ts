import * as GetFocusSelector from '../GetFocusSelector/GetFocusSelector.ts'
import * as GetSearchDisplayResults from '../GetSearchDisplayResults/GetSearchDisplayResults.ts'
import * as GetSearchVirtualDom from '../GetSearchVirtualDom/GetSearchVirtualDom.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

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
      newState.listItems,
      newState.itemHeight,
      newState.fileCount,
      newState.value,
      newState.minLineY,
      newState.maxLineY,
      newState.replacement,
      newState.icons,
      newState.listFocusedIndex,
    )
    const focusOutline = newState.listFocused && newState.listFocusedIndex === -1
    const dom = GetSearchVirtualDom.getSearchVirtualDom(displayResults, newState.flags, newState.message, focusOutline)
    return ['Viewlet.setDom2', newState.uid, dom]
  },
}

const renderFocus = {
  isEqual(oldState: SearchState, newState: SearchState): boolean {
    return oldState.focus === newState.focus || newState.focusSource === InputSource.User
  },
  apply(oldState: SearchState, newState: SearchState): any {
    const selector = GetFocusSelector.getFocusSelector(newState.focus)
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
    const selector = GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchReplaceInput)
    return ['Viewlet.send', newState.uid, 'setValue', newState.replacement, selector]
  },
}

const renderIncludeValue = {
  isEqual(oldState: SearchState, newState: SearchState): boolean {
    return oldState.includeValue === newState.includeValue || newState.inputSource === InputSource.User
  },
  apply(oldState: SearchState, newState: SearchState): any {
    const selector = GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchIncludeInput)
    return ['Viewlet.send', newState.uid, 'setValue', newState.includeValue, selector]
  },
}

const renderExcludeValue = {
  isEqual(oldState: SearchState, newState: SearchState): boolean {
    return oldState.excludeValue === newState.excludeValue || newState.inputSource === InputSource.User
  },
  apply(oldState: SearchState, newState: SearchState): any {
    const selector = GetFocusSelector.getFocusSelector(WhenExpression.FocusSearchExcludeInput)
    return ['Viewlet.send', newState.uid, 'setValue', newState.excludeValue, selector]
  },
}

const render = [renderItems, renderValue, renderIncludeValue, renderExcludeValue, renderReplacement, renderFocus]

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
