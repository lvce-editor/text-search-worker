import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'

export const textSearch = async (scheme: string, root: string, query: string): Promise<TextSearchCompletionResult> => {
  // TODO ask renderer worker for files
  return {
    limitHit: false,
    results: [],
  }
}
