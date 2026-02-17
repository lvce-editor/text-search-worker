import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker, SearchProcess } from '@lvce-editor/rpc-registry'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetTextSearchResultCounts from '../GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'

export const handlePullResultsFound = async (state: SearchState, searchId: string): Promise<SearchState> => {
  if (state.searchId !== searchId) {
    return state
  }
  const result =
    state.platform === PlatformType.Remote || state.platform === PlatformType.Electron
      ? await SearchProcess.invoke('TextSearch.getPullResults', searchId)
      : await RendererWorker.invoke('SearchProcess.invoke', 'TextSearch.getPullResults', searchId)
  const newResults = result?.results || []
  const allResults = [...state.listItems, ...newResults]
  const { fileCount, resultCount } = GetTextSearchResultCounts.getTextSearchResultCounts(allResults)
  const message = SearchStatusMessage.getStatusMessage(resultCount, fileCount)
  const total = allResults.length
  const contentHeight = total * state.itemHeight
  const listHeight = state.height - state.headerHeight
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(state.height, contentHeight, state.minimumSliderSize)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, state.itemHeight)
  const maxLineY = Math.min(numberOfVisible, total)
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const visible = allResults.slice(0, maxLineY)
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visible, state.fileIconCache)
  const limitHit = Boolean(result?.limitHit)
  const limitHitWarning = limitHit ? SearchStrings.theResultSetOnlyContainsASubSetOfMatches() : ''
  const updatedState = {
    ...state,
    fileCount,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    icons,
    items: allResults,
    limitHit,
    limitHitWarning,
    listItems: allResults,
    loaded: true,
    matchCount: resultCount,
    maxLineY,
    message,
    minLineY: 0,
    scrollBarHeight,
  }
  const latest = SearchViewStates.get(state.uid)
  const oldState = latest ? latest.oldState : state
  SearchViewStates.set(state.uid, oldState, updatedState)
  await RendererWorker.invoke('Search.rerender')
  return updatedState
}
