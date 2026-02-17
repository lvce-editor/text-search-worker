export interface TextSearchPullOptions {
  readonly searchId: string
  readonly maxSearchResults?: number
  readonly resultsFoundMethod: string
  readonly ripGrepArgs?: readonly string[]
  readonly searchDir?: string
}
