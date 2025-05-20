import type { SearchState } from '../SearchState/SearchState.ts'
import * as ErrorHandling from '../ErrorHandling/ErrorHandling.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as GetTextSearchResultCounts from '../GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as IsEmptyString from '../IsEmptyString/IsEmptyString.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'
import * as TextSearch from '../TextSearchIncremental/TextSearchIncremental.ts'
import * as ValidateSearchInput from '../ValidateSearchInput/ValidateSearchInput.ts'
import * as SearchProgress from '../SearchProgress/SearchProgress.ts'

export const handleUpdate = async (state: SearchState, update: Partial<SearchState>): Promise<SearchState> => {
  const partialNewState = { ...state, ...update }
  try {
    const { height, itemHeight, minimumSliderSize, headerHeight, flags, value, threads, includeValue, excludeValue } = partialNewState
    if (IsEmptyString.isEmptyString(value)) {
      return {
        ...partialNewState,
        minLineY: 0,
        maxLineY: 0,
        deltaY: 0,
        items: [],
        listItems: [],
        matchCount: 0,
        message: '',
        loaded: true,
        searchInputErrorMessage: '',
        searchProgress: {
          totalResults: 0,
          isComplete: true,
          currentPage: 0,
          resultsPerPage: state.searchProgress.resultsPerPage,
        },
      }
    }
    const searchInputErrorMessage = ValidateSearchInput.validateSearchInput(value, flags)
    if (searchInputErrorMessage) {
      return {
        ...partialNewState,
        searchInputErrorMessage: searchInputErrorMessage,
      }
    }
    const root = state.workspacePath
    const scheme = GetProtocol.getProtocol(root)

    // Start the search if it's a new query
    if (value !== state.value) {
      await TextSearch.textSearch(
        root,
        value,
        {
          threads,
          isCaseSensitive: Boolean(flags & SearchFlags.MatchCase),
          useRegularExpression: Boolean(flags & SearchFlags.UseRegularExpression),
          exclude: excludeValue,
          include: includeValue,
          assetDir: state.assetDir,
          root,
          query: value,
          scheme,
          flags,
          matchWholeWord: Boolean(flags & SearchFlags.MatchWholeWord),
        },
        state.assetDir,
        state.platform,
      )
    }

    // Get current progress
    const progress = await SearchProgress.getSearchProgress(state)

    // Get visible results
    const listHeight = height - headerHeight
    const minLineY = Math.floor(state.deltaY / itemHeight)
    const maxLineY = Math.ceil((state.deltaY + listHeight) / itemHeight)
    const results = await SearchProgress.getSearchResults(state, minLineY, maxLineY + 1)

    if (!Array.isArray(results)) {
      throw new TypeError('results must be of type array')
    }

    const { fileCount, resultCount } = GetTextSearchResultCounts.getTextSearchResultCounts(results)
    const message = SearchStatusMessage.getStatusMessage(resultCount, fileCount)
    const total = progress.totalResults
    const contentHeight = total * itemHeight
    const scrollBarHeight = ScrollBarFunctions.getScrollBarSize(height, contentHeight, minimumSliderSize)
    const finalDeltaY = contentHeight - listHeight

    return {
      ...partialNewState,
      items: results,
      listItems: results,
      minLineY,
      maxLineY,
      deltaY: state.deltaY,
      finalDeltaY,
      scrollBarHeight,
      message,
      loaded: true,
      searchProgress: {
        ...state.searchProgress,
        totalResults: progress.totalResults,
        isComplete: progress.isComplete,
      },
    }
  } catch (error) {
    ErrorHandling.handleError(error)
    return {
      ...partialNewState,
      message: String(error),
      loaded: true,
    }
  }
}
