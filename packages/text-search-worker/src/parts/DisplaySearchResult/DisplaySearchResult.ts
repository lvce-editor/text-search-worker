export interface DisplaySearchResult {
  readonly badgeText: string
  readonly depth: number
  readonly expanded: number
  // TODO maybe use a flags number instead of multiple booleans
  readonly focused: boolean
  readonly icon: string
  readonly matchLength: number
  readonly matchStart: number
  readonly posInSet: number
  readonly replacement: string

  readonly setSize: number
  readonly text: string
  readonly title: string
}
