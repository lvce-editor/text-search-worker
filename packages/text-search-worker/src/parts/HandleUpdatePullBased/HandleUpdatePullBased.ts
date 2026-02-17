import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as GetTextSearchResultCounts from '../GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'

export const handleUpdatePullBased = async (state: SearchState, update: Partial<SearchState>): Promise<SearchState> => {
  const partialNewState = { ...state, ...update }
  const {
    assetDir,
    excludeValue,
    fileIconCache,
    flags,
    headerHeight,
    height,
    includeValue,
    itemHeight,
    limit,
    minimumSliderSize,
    platform,
    threads,
    uid,
    usePullBasedSearch,
    value,
  } = partialNewState
  const root = state.workspacePath
  const scheme = GetProtocol.getProtocol(root)
  const isFileSearch = scheme === '' || scheme === 'file'
  const shouldUsePullBasedSearch = Boolean(usePullBasedSearch) && isFileSearch
  const searchId = crypto.randomUUID()
  const { limitHit, results } = await TextSearch.textSearch(
    root,
    value,
    {
      assetDir,
      defaultExcludes: SearchFlags.hasUseIgnoreFiles(flags) ? partialNewState.defaultExcludes : [],
      exclude: excludeValue,
      flags,
      include: includeValue,
      isCaseSensitive: Boolean(flags & SearchFlags.MatchCase),
      limit,
      matchWholeWord: Boolean(flags & SearchFlags.MatchWholeWord),
      query: value,
      root,
      scheme,
      threads,
      usePullBasedSearch: shouldUsePullBasedSearch,
      useRegularExpression: Boolean(flags & SearchFlags.UseRegularExpression),
    },
    assetDir,
    platform,
    searchId,
    uid,
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
  const { icons, newFileIconCache } = await GetFileIcons.getFileIcons(visible, fileIconCache)
  const limitHitWarning = limitHit ? SearchStrings.theResultSetOnlyContainsASubSetOfMatches() : ''
  return {
    ...partialNewState,
    collapsedPaths: [],
    deltaY: 0,
    fileCount,
    fileIconCache: newFileIconCache,
    finalDeltaY,
    icons,
    items: results,
    limitHit,
    limitHitWarning,
    listItems: results,
    loaded: true,
    matchCount: resultCount,
    maxLineY: maxLineY,
    message,
    minLineY: 0,
    scrollBarHeight,
    searchId,
    searchInputErrorMessage: '',
    threads,
    value,
  }
}
