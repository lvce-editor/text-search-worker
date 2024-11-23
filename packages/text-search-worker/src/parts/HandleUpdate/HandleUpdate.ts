import * as ErrorHandling from '../ErrorHandling/ErrorHandling.ts'
import * as GetFileIcons from '../GetFileIcons/GetFileIcons.ts'
import * as GetNumberOfVisibleItems from '../GetNumberOfVisibleItems/GetNumberOfVisibleItems.ts'
import * as GetTextSearchResultCounts from '../GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as IsEmptyString from '../IsEmptyString/IsEmptyString.ts'
import * as ScrollBarFunctions from '../ScrollBarFunctions/ScrollBarFunctions.ts'
import type { SearchState } from '../SearchState/SearchState.ts'
import * as SearchStatusMessage from '../SearchStatusMessage/SearchStatusMessage.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'

export const handleUpdate = async (state: SearchState, update: Partial<SearchState>): Promise<SearchState> => {
  const partialNewState = { ...state, ...update }
  try {
    const { height, itemHeight, minimumSliderSize, headerHeight, flags, value, threads } = partialNewState
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
      }
    }
    const root = state.workspacePath
    const results = await TextSearch.textSearch(
      root,
      value,
      {
        threads,
        isCaseSensitive: SearchFlags.hasMatchCase(flags),
        useRegularExpression: SearchFlags.hasUseRegularExpression(flags),
      },
      state.assetDir,
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
    }
  } catch (error) {
    ErrorHandling.handleError(error)
    return {
      ...partialNewState,
      message: `${error}`,
      items: [],
      listItems: [],
      matchCount: 0,
      fileCount: 0,
      minLineY: 0,
      maxLineY: 0,
    }
  }
}
