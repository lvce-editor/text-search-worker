import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as GetTextSearchResultCounts from '../GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'

export const handleUpdateFull = async (state: SearchState, update: Partial<SearchState>): Promise<SearchState> => {
  const partialNewState = { ...state, ...update }
  const { height, itemHeight, minimumSliderSize, headerHeight, flags, value, threads, includeValue, excludeValue, assetDir, platform } =
    partialNewState
  const root = state.workspacePath
  const scheme = GetProtocol.getProtocol(root)
  const results = await TextSearch.textSearch(
    root,
    value,
    {
      threads,
      isCaseSensitive: Boolean(flags & SearchFlags.MatchCase),
      useRegularExpression: Boolean(flags & SearchFlags.UseRegularExpression),
      exclude: excludeValue,
      include: includeValue,
      assetDir: assetDir,
      root,
      query: value,
      scheme,
      flags,
      matchWholeWord: Boolean(flags & SearchFlags.MatchWholeWord),
    },
    assetDir,
    platform,
  )
  if (!Array.isArray(results)) {
    throw new TypeError('results must be of type array')
  }
  const { fileCount, resultCount } = GetTextSearchResultCounts.getTextSearchResultCounts(results)
  const message = SearchStatusMessage.getStatusMessage(resultCount, fileCount)
  const total = results.length
  const contentHeight = total * itemHeight
  const listHeight = height - headerHeight
  const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
  const numberOfVisible = GetNumberOfVisibleItems.getNumberOfVisibleItems(listHeight, itemHeight)
  const maxLineY = Math.min(numberOfVisible, total)
  const finalDeltaY = Math.max(contentHeight - listHeight, 0)
  const visible = results.slice(0, maxLineY)
  const icons = await GetFileIcons.getFileIcons(visible)

  return {
    ...partialNewState,
    minLineY: 0,
    deltaY: 0,
    value,
    items: results,
    listItems: results,
    message,
    maxLineY: maxLineY,
    scrollBarHeight,
    finalDeltaY,
    threads,
    fileCount,
    matchCount: resultCount,
    loaded: true,
    icons,
    searchInputErrorMessage: '',
  }
}
