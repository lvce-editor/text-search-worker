import type { TextSearchCompletionResult } from '../TextSearchCompletionResult/TextSearchCompletionResult.ts'

export interface TextSearchProvider {
  (scheme: string, root: string, query: string, options: any, assetDir: string, platform?: number): Promise<TextSearchCompletionResult>
}
