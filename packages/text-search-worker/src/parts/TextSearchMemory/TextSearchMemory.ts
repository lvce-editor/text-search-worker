import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import type { TextSearchOptions } from '../TextSearchOptions/TextSearchOptions.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const textSearch = async (
  scheme: string,
  root: string,
  query: string,
  options: TextSearchOptions,
  assetDir: string,
): Promise<TextSearchCompletionResult> => {
  const results = await RendererWorker.invoke('ExtensionHostTextSearch.textSearchMemory', scheme, root, query, options, assetDir)
  return {
    results,
    limitHit: false,
  }
}
