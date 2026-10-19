import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { SearchResult } from '../SearchResult/SearchResult.ts'
import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as GetOpenEditorPaths from '../GetOpenEditorPaths/GetOpenEditorPaths.ts'
import * as TextSearchResultType from '../TextSearchResultType/TextSearchResultType.ts'

const filterOpenEditorResults = (root: string, results: readonly SearchResult[], openEditorUris: readonly string[]): readonly SearchResult[] => {
  const openEditorPaths = new Set(GetOpenEditorPaths.getOpenEditorPaths(root, openEditorUris))
  let isOpenEditor = false
  return results.filter((result) => {
    if (result.type === TextSearchResultType.File) {
      isOpenEditor = openEditorPaths.has(result.text)
    }
    return isOpenEditor
  })
}

export const textSearch = async (
  scheme: string,
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir: string,
): Promise<TextSearchCompletionResult> => {
  try {
    // @ts-ignore
    const result = await RendererWorker.invoke('ExtensionHostTextSearch.textSearchMemory2', scheme, root, query, options, assetDir)
    if (!result || !result.results) {
      throw new Error(`new api not supported`)
    }
    if (options.openEditorUris) {
      return { ...result, results: filterOpenEditorResults(root, result.results, options.openEditorUris) }
    }
    return result
  } catch {
    const results = await RendererWorker.invoke('ExtensionHostTextSearch.textSearchMemory', scheme, root, query, options, assetDir)
    const filteredResults = options.openEditorUris ? filterOpenEditorResults(root, results, options.openEditorUris) : results
    return {
      limitHit: false,
      results: filteredResults,
    }
  }
}
