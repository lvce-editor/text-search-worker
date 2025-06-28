import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as GetTextSearchRipGrepArgs from '../GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as ParentRpc from '../RendererWorker/RendererWorker.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'

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
  if (platform === PlatformType.Remote || platform === PlatformType.Electron) {
    const result = await SearchProcess.invoke('TextSearch.search', actualOptions)
    // TODO api is weird
    // @ts-ignore
    return result.results
  }
  const results = await ParentRpc.invoke('SearchProcess.invoke', 'TextSearch.search', actualOptions)
  // TODO api is weird
  return results.results
}
