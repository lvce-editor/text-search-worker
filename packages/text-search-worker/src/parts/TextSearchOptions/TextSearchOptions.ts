export interface TextSearchOptions {
  readonly scheme: string
  readonly root: string
  readonly query: string
  readonly assetDir: string
  readonly threads: number
  readonly include: string
  readonly exclude: string

  // TODO use flags or options object?
  readonly useRegularExpression: boolean
  readonly isCaseSensitive: boolean
  readonly matchWholeWord: boolean

  readonly flags: number

  readonly limit: number
}
