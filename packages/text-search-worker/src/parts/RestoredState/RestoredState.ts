export interface RestoredState {
  readonly savedValue: string
  readonly savedReplaceExpanded: boolean
  readonly savedCollapsedPaths: readonly string[]
  readonly threads: number
  readonly replacement: string
  readonly savedPreserveCase: boolean
  readonly savedMatchCase: boolean
  readonly savedMatchWholeWord: boolean
}
