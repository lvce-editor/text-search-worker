export interface RestoredState {
  readonly savedValue: string
  readonly savedCollapsedPaths: readonly string[]
  readonly threads: number
  readonly replacement: string
  readonly flags: number
}
