import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as GetTextSearchRipGrepArgs from '../GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'
import * as SearchProcessElectron from '../SearchProcessElectron/SearchProcessElectron.ts'

export const textSearch = async (
  scheme: string,
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir?: string,
  platform?: number,
): Promise<readonly SearchResult[]> => {
  const ripGrepArgs = GetTextSearchRipGrepArgs.getRipGrepArgs({
    ...options,
    searchString: query,
  })
  const actualOptions = {
    ripGrepArgs,
    searchDir: root,
  }
  if (platform === PlatformType.Remote) {
    const result = await SearchProcess.invoke('TextSearch.search', actualOptions)
    // TODO api is weird
    return result.results
  }
  if (platform === PlatformType.Electron) {
    const result = await SearchProcessElectron.invoke('TextSearch.search', actualOptions)
    return result.results
  }
  const results = await ParentRpc.invoke('SearchProcess.invoke', 'TextSearch.search', actualOptions)
  // TODO api is weird
  return results.results
}
