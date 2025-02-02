import type { Renderer } from '../Renderer/Renderer.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as GetSearchDisplayResults from '../GetSearchDisplayResults/GetSearchDisplayResults.ts'
import * as GetSearchVirtualDom from '../GetSearchVirtualDom/GetSearchVirtualDom.ts'
import * as InputName from '../InputName/InputName.ts'
import * as InputSource from '../InputSource/InputSource.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'

const renderItems = (oldState: SearchState, newState: SearchState): any => {
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
    newState.collapsedPaths,
    newState.items,
  )
  const focusOutline = newState.listFocused && newState.listFocusedIndex === -1
  const scrollBarValue = (newState.deltaY / newState.finalDeltaY) * 100
  const scrollBarY = ScrollBarFunctions.getScrollBarY(
    newState.deltaY,
    newState.finalDeltaY,
    newState.height - newState.headerHeight,
    newState.scrollBarHeight,
  )
  const dom = GetSearchVirtualDom.getSearchVirtualDom(
    displayResults,
    newState.flags,
    newState.message,
    focusOutline,
    newState.searchInputErrorMessage,
    newState.scrollBarHeight,
    scrollBarY,
    scrollBarValue,
    newState.deltaY,
    newState.itemHeight,
    newState.matchCount,
  )
  return ['Viewlet.setDom2', newState.uid, dom]
}

const renderFocus = (oldState: SearchState, newState: SearchState): boolean => {
  return oldState.focus === newState.focus || newState.focusSource === InputSource.User
}

const renderValue = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.value, `[name="${InputName.SearchValue}"]`]
}

const renderReplacement = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.replacement, `[name=${InputName.ReplaceValue}]`]
}

const renderIncludeValue = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.includeValue, `[name=${InputName.FilesToInclude}]`]
}

const renderExcludeValue = (oldState: SearchState, newState: SearchState): any => {
  return ['Viewlet.send', newState.uid, 'setValue', newState.excludeValue, `[name=${InputName.FilesToExclude}]`]
}

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderValue:
      return renderValue
    case DiffType.RenderFocus:
      return renderFocus
    case DiffType.RenderReplaceValue:
      return renderReplacement
    case DiffType.RenderIncludeValue:
      return renderIncludeValue
    case DiffType.RenderExcludeValue:
      return renderExcludeValue
    case DiffType.RenderItems:
      return renderItems
    default:
      throw new Error('unknown renderer')
  }
}
