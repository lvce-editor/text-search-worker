import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as Assert from '../Assert/Assert.ts'
import { getRipGrepArgs } from '../GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'

export const textSearch = async (
  scheme: string,
  root: string,
  query: string,
  options?: Partial<TextSearchOptions>,
): Promise<TextSearchCompletionResult> => {
  Assert.string(scheme)
  Assert.string(query)
  const ripGrepArgs = getRipGrepArgs({ isCaseSensitive: false, threads: 1, useRegularExpression: false, ...options, searchString: query })
  const results = await RendererWorker.invoke('ExtensionHostTextSearch.executeTextSearchProvider', scheme, query, root, ripGrepArgs)
  if (!Array.isArray(results)) {
    return results
  }
  return {
    limitHit: false,
    results,
  }
}
