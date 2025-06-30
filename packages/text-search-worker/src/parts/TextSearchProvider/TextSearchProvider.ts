import type { SearchResult } from '../SearchResult/SearchResult.ts'

export interface TextSearchProvider {
  (scheme: string, root: string, query: string, options: any, assetDir: string, platform?: number): Promise<readonly SearchResult[]>
}
