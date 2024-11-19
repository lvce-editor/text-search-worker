export interface RestoredState {
  readonly savedValue: string
  readonly savedReplaceExpanded: boolean
  readonly savedCollapsedPaths: readonly string[]
  readonly threads: number
  readonly replacement: string
}
