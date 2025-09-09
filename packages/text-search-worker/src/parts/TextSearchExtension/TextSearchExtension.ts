import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'
import * as Assert from '../Assert/Assert.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

export const textSearch = async (scheme: string, root: string, query: string): Promise<TextSearchCompletionResult> => {
  Assert.string(scheme)
  Assert.string(query)
  const results = await RendererWorker.invoke('ExtensionHostTextSearch.executeTextSearchProvider', scheme, query)
  return {
    results,
    limitHit: false,
  }
}
