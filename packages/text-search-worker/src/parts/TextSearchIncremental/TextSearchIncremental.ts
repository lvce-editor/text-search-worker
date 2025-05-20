import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as GetTextSearchRipGrepArgs from '../GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'
import * as SearchProcessElectron from '../SearchProcessElectron/SearchProcessElectron.ts'

export interface SearchProgress {
  readonly totalResults: number
  readonly isComplete: boolean
}

export interface SearchResults {
  readonly results: readonly SearchResult[]
  readonly progress: SearchProgress
}

export interface TextSearchIncrementalOptions extends TextSearchOptions {
  readonly ripGrepArgs: readonly string[]
  readonly searchDir: string
  readonly page: number
  readonly resultsPerPage: number
}

export const textSearch = async (
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir?: string,
  platform?: number,
  page: number = 0,
  resultsPerPage: number = 100,
): Promise<SearchResults> => {
  const ripGrepArgs = GetTextSearchRipGrepArgs.getRipGrepArgs({
    ...options,
    searchString: query,
  })
  const actualOptions: TextSearchIncrementalOptions = {
    ...options,
    ripGrepArgs,
    searchDir: root,
    page,
    resultsPerPage,
  }

  if (platform === PlatformType.Remote) {
    const result = await SearchProcess.invoke('TextSearch.searchIncremental', actualOptions)
    return result
  }
  if (platform === PlatformType.Electron) {
    const result = await SearchProcessElectron.invoke('TextSearch.searchIncremental', actualOptions)
    return result
  }
  const results = await ParentRpc.invoke('SearchProcess.invoke', 'TextSearch.searchIncremental', actualOptions)
  return results
}
