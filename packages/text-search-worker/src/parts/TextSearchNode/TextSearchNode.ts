import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as GetOpenEditorPaths from '../GetOpenEditorPaths/GetOpenEditorPaths.ts'
import * as GetTextSearchRipGrepArgs from '../GetTextSearchRipGrepArgs/GetTextSearchRipGrepArgs.ts'
import * as InvokeSearchProcess from '../InvokeSearchProcess/InvokeSearchProcess.ts'

export const textSearch = async (
  scheme: string,
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir?: string,
  _platform?: number,
  searchId?: string,
  uid?: number,
): Promise<TextSearchCompletionResult> => {
  const openEditorPaths = options.openEditorUris ? GetOpenEditorPaths.getOpenEditorPaths(root, options.openEditorUris) : undefined
  if (openEditorPaths && openEditorPaths.length === 0) {
    return {
      limitHit: false,
      results: [],
    }
  }
  const ripGrepArgs = GetTextSearchRipGrepArgs.getRipGrepArgs({
    ...options,
    ...(openEditorPaths && { paths: openEditorPaths }),
    searchString: query,
  })
  if (options.usePullBasedSearch && searchId && (scheme === '' || scheme === 'file')) {
    const pullSearchOptions = {
      ripGrepArgs,
      searchDir: root,
      searchId,
      uid,
    }
    await InvokeSearchProcess.invoke('TextSearch.searchPull', pullSearchOptions)
    return {
      limitHit: false,
      results: [],
    }
  }
  const actualOptions = {
    ripGrepArgs,
    searchDir: root,
  }
  const result = await InvokeSearchProcess.invoke('TextSearch.search', actualOptions)
  return {
    limitHit: result.limitHit,
    results: result.results,
  }
}
