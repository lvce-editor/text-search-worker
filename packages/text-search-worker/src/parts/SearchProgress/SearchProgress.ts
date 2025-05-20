import type { SearchState } from '../SearchState/SearchState.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'

export interface SearchProgress {
  readonly totalResults: number
  readonly isComplete: boolean
}

export const getSearchProgress = async (state: SearchState): Promise<SearchProgress> => {
  const { workspacePath, value, flags, threads, includeValue, excludeValue, assetDir, platform } = state
  const result = await ParentRpc.invoke('SearchProcess.invoke', 'TextSearch.getProgress', {
    root: workspacePath,
    query: value,
    threads,
    isCaseSensitive: Boolean(flags & 16), // MatchCase
    useRegularExpression: Boolean(flags & 2), // UseRegularExpression
    exclude: excludeValue,
    include: includeValue,
    assetDir,
    platform,
  })
  return result
}

export const getSearchResults = async (state: SearchState, startIndex: number, endIndex: number): Promise<readonly any[]> => {
  const { workspacePath, value, flags, threads, includeValue, excludeValue, assetDir, platform } = state
  const result = await ParentRpc.invoke('SearchProcess.invoke', 'TextSearch.getResults', {
    root: workspacePath,
    query: value,
    threads,
    isCaseSensitive: Boolean(flags & 16), // MatchCase
    useRegularExpression: Boolean(flags & 2), // UseRegularExpression
    exclude: excludeValue,
    include: includeValue,
    assetDir,
    platform,
    startIndex,
    endIndex,
  })
  return result
}
