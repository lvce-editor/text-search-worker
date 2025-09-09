import type { SearchState } from '../SearchState/SearchState.ts'
import * as GetProtocol from '../GetProtocol/GetProtocol.ts'
import * as SearchFlags from '../SearchFlags/SearchFlags.ts'
import * as SearchViewStates from '../SearchViewStates/SearchViewStates.ts'
import * as TextSearchIncremental from '../TextSearchIncremental/TextSearchIncremental.ts'

export const handleUpdateIncremental = async (state: SearchState, update: Partial<SearchState>): Promise<SearchState> => {
  const partialNewState = { ...state, ...update }
  const { flags, value, threads, includeValue, excludeValue, limit, uid, assetDir, platform } = partialNewState
  const root = state.workspacePath
  const scheme = GetProtocol.getProtocol(root)
  const searchId = crypto.randomUUID() // TODO try to avoid side effect
  const latest1 = SearchViewStates.get(uid)
  const updatedState1: SearchState = {
    ...latest1.newState,
    ...partialNewState,
    searchId,
  }
  SearchViewStates.set(uid, latest1.oldState, updatedState1)

  // TODO await promise?
  void TextSearchIncremental.textSearchIncremental(
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
      limit,
    },
    assetDir,
    platform,
    searchId,
    uid,
  )
  return state
}
