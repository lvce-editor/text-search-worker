import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import { getTextSearchResultCounts } from '../GetTextSearchResultCounts/GetTextSearchResultCounts.ts'
import * as GetSearchWarningMessageHeight from '../GetSearchWarningMessageHeight/GetSearchWarningMessageHeight.ts'
import * as GetTopHeight from '../GetTopHeight/GetTopHeight.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import { getStatusMessage } from '../SearchStatusMessage/SearchStatusMessage.ts'
import * as SearchStrings from '../SearchStrings/SearchStrings.ts'
import { get, set } from '../SearchViewStates/SearchViewStates.ts'
import * as TextSearch from '../TextSearch/TextSearch.ts'

export const handleUpdatePullBased = async (state: SearchState, update: Partial<SearchState>): Promise<SearchState> => {
  const searchId = crypto.randomUUID()
  const partialNewState: SearchState = { ...state, ...update, items: [], listItems: [], message: '', searchId, searchResults: [] }
  set(state.uid, state, partialNewState)
  const { assetDir, excludeValue, flags, includeValue, limit, platform, threads, uid, usePullBasedSearch, value, width } = partialNewState
  const root = state.workspacePath
  const scheme = GetProtocol.getProtocol(root)
  const isFileSearch = scheme === '' || scheme === 'file'
  const shouldUsePullBasedSearch = Boolean(usePullBasedSearch) && isFileSearch
  const { limitHit } = await TextSearch.textSearch(
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

  const latest = get(uid)
  if (!latest) {
    return state
  }
  const limitHitWarning = limitHit ? SearchStrings.theResultSetOnlyContainsASubSetOfMatches() : ''
  const warningHeight = await GetSearchWarningMessageHeight.getSearchWarningMessageHeight(limitHitWarning, width)
  const headerHeight = GetTopHeight.getTopHeight(flags) + warningHeight
  const { fileCount, resultCount } = getTextSearchResultCounts(latest.newState.items)
  const message = getStatusMessage(resultCount, fileCount)
  return {
    ...latest.newState,
    headerHeight,
    limitHit,
    limitHitWarning,
    message,
  }
}
