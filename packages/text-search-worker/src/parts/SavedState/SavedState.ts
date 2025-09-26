export interface SavedState {
  readonly collapsedPaths: readonly string[]
  readonly excludeValue: string
  readonly flags: number
  readonly history: readonly string[]
  readonly includeValue: string
  readonly replacement: string
  readonly value: string
}
