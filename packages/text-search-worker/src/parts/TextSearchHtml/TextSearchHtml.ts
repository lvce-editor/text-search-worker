import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const textSearch = async (scheme: string, root: string, query: string): Promise<TextSearchCompletionResult> => {
  const results = await RendererWorker.invoke('ExtensionHostTextSearch.textSearchHtml', scheme, root, query)
  return {
    results,
    limitHit: false,
  }
}
