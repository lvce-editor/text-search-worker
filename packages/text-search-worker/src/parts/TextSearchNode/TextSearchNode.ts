import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as GetTextSearchRipGrepArgs from '../GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'
import * as SearchProcess from '../SearchProcess/SearchProcess.ts'

export const textSearch = async (
  scheme: string,
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir?: string,
  platform?: number,
): Promise<TextSearchCompletionResult> => {
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
    return {
      results: result.results,
      limitHit: result.limitHit,
    }
  }
  // TODO always create search process messageport rpc to have one api, in web can send the messageport to renderer worker
  const result = await RendererWorker.invoke('SearchProcess.invoke', 'TextSearch.search', actualOptions)
  // TODO api is weird
  return {
    results: result.results,
    limitHit: result.limitHit,
  }
}
