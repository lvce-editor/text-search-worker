export interface TextSearchOptions {
  readonly scheme: string
  readonly root: string
  readonly query: string
  readonly assetDir: string
  readonly threads: number

  // TODO use flags
  readonly useRegularExpression: boolean
  readonly isCaseSensitive: boolean
}
