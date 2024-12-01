import * as GetTextSearchRipGrepArgs from '../GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'
import * as ParentRpc from '../ParentRpc/ParentRpc.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'

export const textSearch = async (scheme: string, root: string, query: string, options: any, assetDir: string, platform: number): Promise<any> => {
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
  const results = await ParentRpc.invoke('SearchProcess.invoke', 'TextSearch.search', actualOptions)
  // TODO api is weird
  return results.results
}
