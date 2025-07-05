export interface DisplaySearchResult {
  readonly title: string
  readonly text: string
  readonly icon: string
  readonly posInSet: number
  readonly setSize: number
  readonly matchStart: number
  readonly matchLength: number
  readonly replacement: string
  readonly depth: number

  // TODO maybe use a flags number instead of multiple booleans
  readonly focused: boolean
  readonly expanded: number
  readonly badgeText: string
}
