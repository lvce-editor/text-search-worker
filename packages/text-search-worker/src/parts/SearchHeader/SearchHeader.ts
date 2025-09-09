export interface SearchHeader {
  readonly excludeValue: string
  readonly focus: number
  readonly focused: boolean
  readonly focusSource: number
  readonly includeValue: string
  readonly flags: number
  readonly replacement: string
  readonly value: string
  readonly searchInputErrorMessage: string
  readonly history: readonly string[]
  readonly historyIndex: number
  readonly viewMode: number
  readonly incrementalSearch: boolean
  readonly searchId: string
  readonly useFileIcons: boolean
  readonly useChevrons: boolean
  readonly limitHit: boolean
  readonly limitHitWarning: string
  readonly limit: number
}
